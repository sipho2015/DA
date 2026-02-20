using DA.Api.Contracts;
using DA.Api.Data;
using DA.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DA.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VehiclesController(FleetDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<VehicleResponse>>> GetAll(CancellationToken cancellationToken)
    {
        var vehicles = await db.Vehicles
            .OrderBy(v => v.Make)
            .ThenBy(v => v.Model)
            .ThenBy(v => v.Plate)
            .Select(v => ToResponse(v))
            .ToListAsync(cancellationToken);

        return Ok(vehicles);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<VehicleResponse>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var vehicle = await db.Vehicles.FirstOrDefaultAsync(v => v.Id == id, cancellationToken);
        if (vehicle is null)
        {
            return NotFound();
        }

        return Ok(ToResponse(vehicle));
    }

    [HttpPost]
    public async Task<ActionResult<VehicleResponse>> Create(CreateVehicleRequest request, CancellationToken cancellationToken)
    {
        if (await db.Vehicles.AnyAsync(v => v.Plate == request.Plate, cancellationToken))
        {
            return Conflict("A vehicle with the same plate already exists.");
        }

        var vehicle = new Vehicle
        {
            Make = request.Make.Trim(),
            Model = request.Model.Trim(),
            Year = request.Year,
            Plate = request.Plate.Trim().ToUpperInvariant(),
            Status = request.Status
        };

        db.Vehicles.Add(vehicle);
        await db.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetById), new { id = vehicle.Id }, ToResponse(vehicle));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<VehicleResponse>> Update(Guid id, UpdateVehicleRequest request, CancellationToken cancellationToken)
    {
        var vehicle = await db.Vehicles.FirstOrDefaultAsync(v => v.Id == id, cancellationToken);
        if (vehicle is null)
        {
            return NotFound();
        }

        var plateUpper = request.Plate.Trim().ToUpperInvariant();
        var duplicatePlateExists = await db.Vehicles.AnyAsync(v => v.Id != id && v.Plate == plateUpper, cancellationToken);
        if (duplicatePlateExists)
        {
            return Conflict("A vehicle with the same plate already exists.");
        }

        vehicle.Make = request.Make.Trim();
        vehicle.Model = request.Model.Trim();
        vehicle.Year = request.Year;
        vehicle.Plate = plateUpper;
        vehicle.Status = request.Status;

        await db.SaveChangesAsync(cancellationToken);
        return Ok(ToResponse(vehicle));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var vehicle = await db.Vehicles.FirstOrDefaultAsync(v => v.Id == id, cancellationToken);
        if (vehicle is null)
        {
            return NotFound();
        }

        db.Vehicles.Remove(vehicle);
        await db.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    private static VehicleResponse ToResponse(Vehicle v) =>
        new(v.Id, v.Make, v.Model, v.Year, v.Plate, v.Status, v.CreatedAtUtc);
}
