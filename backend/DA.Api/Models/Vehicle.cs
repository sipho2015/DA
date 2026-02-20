using System.ComponentModel.DataAnnotations;

namespace DA.Api.Models;

public class Vehicle
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(50)]
    public required string Make { get; set; }

    [MaxLength(50)]
    public required string Model { get; set; }

    [Range(1900, 3000)]
    public int Year { get; set; }

    [MaxLength(20)]
    public required string Plate { get; set; }

    public VehicleStatus Status { get; set; } = VehicleStatus.Active;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
