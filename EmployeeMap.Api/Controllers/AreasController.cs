using System.Collections.Generic;
using System.Linq;
using EmployeeMap.Data.Database;
using EmployeeMap.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeMap.Api.Controllers
{
    [Route("api/[controller]")]
    public class AreasController : Controller
    {
        private readonly EmployeeMapContext context;

        public AreasController(EmployeeMapContext context)
        {
            this.context = context;
        }

        // GET api/areas
        [HttpGet]
        public IEnumerable<Area> Get()
        {
            return context.Areas
                .Include(a => a.Employees)
                .ToList();
        }

        // GET api/areas/5
        [HttpGet("{id}")]
        public Area Get(int id)
        {
            return context.Areas
                .Include(a => a.Employees)
                .Single(a => a.Id == id);
        }

        // POST api/areas
        [HttpPost]
        public void Post([FromBody]Area area)
        {
            context.Areas.Add(area);
            context.SaveChanges();
        }

        // PUT api/areas/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Area area)
        {
            var dbArea = context.Areas.Single(a => a.Id == id);
            dbArea.Name = area.Name;
            dbArea.Employees = area.Employees;
            context.SaveChanges();
        }

        // DELETE api/areas/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var area = context.Areas.Single(a => a.Id == id);
            context.Areas.Remove(area);
            context.SaveChanges();
        }
    }
}
