using EmployeeMap.Data;
using Microsoft.Extensions.Configuration;

namespace EmployeeMap.Api
{
    public class Configuration : IDatabaseConfiguration
    {
        private IConfiguration configuration;

        public string ConnectionString => configuration["database:connectionString"];
        public string CorsAllowedDomain => configuration["cors:allowedDomain"];

        public Configuration(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
    }
}