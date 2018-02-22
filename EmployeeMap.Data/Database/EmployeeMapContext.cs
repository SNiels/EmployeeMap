using EmployeeMap.Data;
using EmployeeMap.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeMap.Data.Database
{
    public class EmployeeMapContext : DbContext
    {
        private readonly string connectionString;

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Area> Areas { get; set; }

        public EmployeeMapContext(IDatabaseConfiguration connectionString)
        {
            this.connectionString = connectionString.ConnectionString;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Employee
            modelBuilder.Entity<Employee>()
                .Property(e => e.Id)
                .IsRequired()
                .UseSqlServerIdentityColumn();

            modelBuilder.Entity<Employee>()
                .Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Employee>()
                .Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Location);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Area)
                .WithMany(a => a.Employees)
                .HasForeignKey(e => e.AreaId);
            #endregion

            #region Area
            modelBuilder.Entity<Area>()
                .Property(a => a.Id)
                .IsRequired()
                .UseSqlServerIdentityColumn();

            modelBuilder.Entity<Area>()
                .Property(a => a.Name)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Area>()
                .HasMany(a => a.Employees)
                .WithOne(e => e.Area)
                .HasForeignKey(e => e.AreaId);
            #endregion
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
