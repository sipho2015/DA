using DA.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DA.Api.Data;

public class FleetDbContext(DbContextOptions<FleetDbContext> options) : DbContext(options)
{
    public DbSet<Vehicle> Vehicles => Set<Vehicle>();
}
