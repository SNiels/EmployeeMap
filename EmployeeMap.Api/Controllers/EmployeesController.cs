using System.Collections.Generic;
using System.Linq;
using EmployeeMap.Data.Database;
using EmployeeMap.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeMap.Api.Controllers
{
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly EmployeeMapContext context;

        public EmployeesController(EmployeeMapContext context)
        {
            this.context = context;
        }

        // GET api/employees
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return context.Employees
                .Include(e => e.Area)
                .ToList();
        }

        // GET api/employees/5
        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            return context.Employees
                .Include(e => e.Area)
                .Single(e => e.Id == id);
        }

        // POST api/employees
        [HttpPost]
        public void Post([FromBody]Employee employee)
        {
            context.Employees.Add(employee);
            context.SaveChanges();
        }

        // PUT api/employees/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Employee employee)
        {
            var dbEmployee = context.Employees.Single(e => e.Id == id);
            dbEmployee.FirstName = employee.FirstName;
            dbEmployee.LastName = employee.LastName;
            dbEmployee.Area = employee.Area;
            dbEmployee.AreaId = employee.AreaId;
            dbEmployee.Location = employee.Location;
            context.SaveChanges();
        }

        // DELETE api/employees/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var employee = context.Employees.Single(e => e.Id == id);
            context.Employees.Remove(employee);
            context.SaveChanges();
        }
    }
}
