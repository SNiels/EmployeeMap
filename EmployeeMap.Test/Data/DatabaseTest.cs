using EmployeeMap.Data;
using EmployeeMap.Data.Models;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.EntityFrameworkCore;
using EmployeeMap.Data.Database;

namespace EmployeeMap.Test.Data
{
    [TestClass]
    public class DatabaseTest
    {
        private EmployeeMapContext context;
        private IDatabaseConfiguration configuration = new Configuration();

        [TestInitialize]
        public void CreateDatabase()
        {
            context = new EmployeeMapContext(configuration);
            context.Database.EnsureDeleted();
            context.Database.Migrate();
        }

        [TestMethod]
        public void Test_That_Areas_Can_Be_Created()
        {
            context.Areas.Add(new Area
            {
                Name = "Executive Area"
            });

            context.Areas.Add(new Area
            {
                Name = "Open Area"
            });

            context.SaveChanges();

            Assert.IsTrue(context.Areas.Any(a => a.Name == "Executive Area"), "Executive Area not found in database");
            Assert.IsTrue(context.Areas.Any(a => a.Name == "Open Area"), "Open Area not found in database");
        }

        [TestMethod]
        public void Test_That_Employees_Can_Be_Linked_To_Areas()
        {
            var area = new Area
            {
                Name = "Open Area"
            };

            context.Areas.Add(area);

            context.Employees.Add(new Employee
            {
                FirstName = "Niels",
                LastName = "Swimberghe",
                Area = area
            });

            context.SaveChanges();
            
            area = context.Areas.Include(a => a.Employees).Single(a => a.Name == "Open Area");
            Assert.IsTrue(area.Employees.Any(e => e.FirstName == "Niels"), "Niels was not found in the Open Area");
        }

        [TestCleanup]
        public void DropDatabase()
        {
            context.Database.EnsureDeleted();
            context.Dispose();
        }
    }
}
