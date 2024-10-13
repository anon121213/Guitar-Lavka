using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;

namespace MyWebAPI.Vendor.Server.DBController
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<EventData> Products { get; set; }
    }
}