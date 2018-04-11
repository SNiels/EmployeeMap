using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;

namespace EmployeeMap.App.Extensions
{
    public static class HostingEnvironmentExtensions
    {
        public static void UseRootNodeModules(this IHostingEnvironment hostingEnvironment)
        {
            var nodeDir = Path.Combine(hostingEnvironment.ContentRootPath, "../node_modules");
            Environment.SetEnvironmentVariable("NODE_PATH", nodeDir);
        }
    }
}
