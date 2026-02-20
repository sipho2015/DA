using DA.Api.Models;

namespace DA.Api.Data;

public static class FleetSeed
{
    public static void SeedIfEmpty(this FleetDbContext db)
    {
        if (db.Vehicles.Any())
        {
            return;
        }

        db.Vehicles.AddRange(
            new Vehicle { Make = "Hyundai", Model = "H1", Year = 2022, Plate = "ABD 1201", Status = VehicleStatus.Active },
            new Vehicle { Make = "Hyundai", Model = "H1", Year = 2022, Plate = "ABD 1204", Status = VehicleStatus.Service },
            new Vehicle { Make = "Toyota", Model = "Hiace", Year = 2021, Plate = "ABH 4501", Status = VehicleStatus.Active },
            new Vehicle { Make = "Toyota", Model = "Quantum", Year = 2020, Plate = "ABZ 6027", Status = VehicleStatus.Service },
            new Vehicle { Make = "Toyota", Model = "Quantum", Year = 2020, Plate = "ABZ 6029", Status = VehicleStatus.Active },
            new Vehicle { Make = "Coaster", Model = "Bus", Year = 2019, Plate = "ABC 3305", Status = VehicleStatus.Documentation },
            new Vehicle { Make = "Yutong", Model = "Bus", Year = 2023, Plate = "ABY 9104", Status = VehicleStatus.Service }
        );

        db.SaveChanges();
    }
}
