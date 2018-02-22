using Microsoft.Extensions.Configuration;
using System.IO;

namespace EmployeeMap.Data
{
    public class Configuration : IDatabaseConfiguration
    {
        private static IConfigurationRoot configuration;

        public string ConnectionString => configuration["database:connectionString"];

        static Configuration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            configuration = builder.Build();
        }
    }
}
