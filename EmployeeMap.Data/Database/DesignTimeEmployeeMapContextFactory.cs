using Microsoft.EntityFrameworkCore.Design;

namespace EmployeeMap.Data.Database
{
    public class DesignTimeEmployeeMapContextFactory : IDesignTimeDbContextFactory<EmployeeMapContext>
    {
        public EmployeeMapContext CreateDbContext(string[] args)
        {
            var configuration = new Configuration();// for dotnet ef commands
            return new EmployeeMapContext(configuration);
        }
    }
}
