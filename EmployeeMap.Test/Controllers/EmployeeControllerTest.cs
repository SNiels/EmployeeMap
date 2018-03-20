using EmployeeMap.Api.Controllers;
using EmployeeMap.Data;
using EmployeeMap.Data.Database;
using EmployeeMap.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace EmployeeMap.Test.Controllers
{
    [TestClass]
    public class EmployeeControllerTests
    {
        private EmployeeMapContext context;
        private EmployeesController controller;
        private IDatabaseConfiguration configuration = new Configuration();

        [TestInitialize]
        public void CreateDatabase()
        {
            context = new EmployeeMapContext(configuration);
            context.Database.EnsureDeleted();
            context.Database.Migrate();
            controller = new EmployeesController(context);

            context.Areas.Add(new Area
            {
                Name = "Executive Area"
            });

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

            context.Employees.Add(new Employee
            {
                FirstName = "Micheal",
                LastName = "Fly",
                Area = area
            });

            context.SaveChanges();
        }

        [TestMethod]
        public void TestGetAllEmployees()
        {
            var employees = controller.GetAll();
            Assert.AreEqual(employees.Count(), 2, "The amount of employees should be 2.");
        }

        [TestMethod]
        public void TesChangeAreaForEmployee()
        {
            var employees = controller.GetAll();
            var newAreaId = context.Areas.First().Id;
            foreach (var employee in employees)
            {
                employee.AreaId = newAreaId;
                controller.Put(employee.Id, employee);
            }

            employees = controller.GetAll();
            foreach(var employee in employees)
            {
                Assert.AreEqual(employee.AreaId, newAreaId, $"The area id should be {newAreaId}.");
            }
        }

        [TestCleanup]
        public void DropDatabase()
        {
            controller = null;
            context.Database.EnsureDeleted();
            context.Dispose();
        }
    }
}
