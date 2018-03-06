using Microsoft.Extensions.Configuration;
using System.IO;

namespace EmployeeMap.App
{
    public class Configuration
    {
        private IConfiguration configuration;

        public string ApiRoot => configuration["api:root"];

        public Configuration(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
    }
}