using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Port.Domain.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Port.Domain.Provider;
using System;

namespace Port
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
               services.AddCors(c =>
           {
               c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
           });
            services.AddDbContext<ShipDataContext>(opt => opt.UseInMemoryDatabase("DatabasePost"));
            services.AddScoped<IShipDataProvider, ShipDataProvider>();
            services.AddScoped<ShipDataContext, ShipDataContext>();
           
            services.AddScoped<Random>();
            services.AddScoped<NumberGenerator>();
            services.AddControllers();
            services.AddSwaggerGen(swg =>
            {
                swg.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Port", Version = "V1" });
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger(s =>
               {
                   s.SerializeAsV2 = true;
                   s.PreSerializeFilters.Add((swagger, httpReq) =>
                   {
                       swagger.Servers = new List<OpenApiServer> { new OpenApiServer { Url = $"{httpReq.Scheme}://{httpReq.Host.Value}" } };
                   });
               });


                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Port Ship App API V1");
                });
            }

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
          // .AllowCredentials());
           // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
