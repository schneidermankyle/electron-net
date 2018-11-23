using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace api
{
    class Program {
        static void Main(string[] args) {
            // Build out and call our server quick
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }

        // This is the setup for our main server
        public class Startup {
            public Startup(IHostingEnvironment env) {

            }

            // This calls our services at runtime. We can add some different options on here
            public void ConfigureServices(IServiceCollection services) {
                // The main framework service
                services.AddMvc().AddJsonOptions(options =>
                {
                    // returns everything in JSON format. This is the function equivelent to "echo json_encode()" in PHP
                    options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
                });

            }

            // We use this to configure the HTTP request pipeline
            public void Configure(IApplicationBuilder app) {
                app.UseMvc();
            }
        }
    }
}


