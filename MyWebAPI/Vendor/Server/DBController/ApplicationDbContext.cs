using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;

namespace MyWebAPI.Data
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