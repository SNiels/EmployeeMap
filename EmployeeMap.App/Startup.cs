using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.Webpack;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace EmployeeMap.App
{
    public class Startup
    {
        public Configuration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = new Configuration(configuration);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {   
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });
            }

            app.Use(async (context, next) =>
            {
                await next();
                if (!Path.HasExtension(context.Request.Path))
                {
                    context.Request.Path = "/index.html";
                }
                await next();
                context.Response.Cookies.Append("X-ApiRoot", Configuration.ApiRoot);
            });

            app.UseStaticFiles();
            app.UseDefaultFiles();
        }
    }
}
