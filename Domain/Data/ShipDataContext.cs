
using Microsoft.EntityFrameworkCore;
using Port.Domain.Models;

namespace Port.Domain.Data
{
public class ShipDataContext:DbContext
{
public ShipDataContext(DbContextOptions<ShipDataContext> options):base (options)
{

}
public DbSet<Ship> Ships{get;set;}
}
}