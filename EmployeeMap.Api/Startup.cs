using EmployeeMap.Data;
using EmployeeMap.Data.Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EmployeeMap.Api
{
    public class Startup
    {
        public Configuration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = new Configuration(configuration);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc();

            services.AddSingleton<IDatabaseConfiguration>(Configuration);
            services.AddDbContext<EmployeeMapContext>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.WithOrigins(Configuration.CorsAllowedDomain)
                .AllowAnyHeader()
                .AllowAnyMethod()
            );

            app.UseMvc();
        }
    }
}
