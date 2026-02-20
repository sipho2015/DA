using DA.Api.Models;

namespace DA.Api.Contracts;

public record VehicleResponse(
    Guid Id,
    string Make,
    string Model,
    int Year,
    string Plate,
    VehicleStatus Status,
    DateTime CreatedAtUtc
);

public record CreateVehicleRequest(
    string Make,
    string Model,
    int Year,
    string Plate,
    VehicleStatus Status
);

public record UpdateVehicleRequest(
    string Make,
    string Model,
    int Year,
    string Plate,
    VehicleStatus Status
);
