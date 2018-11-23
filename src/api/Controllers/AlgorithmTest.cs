using System;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {

    // This is the controller for /api/algorithmTest route
    // Each route will have its own controller and the system
    // will automatically register the route to the substring 
    // that preceeds "controller" in the class name. In this case
    // it is "AlgorithmTest" converted to camelcase
    [Route("api/[controller]")]
    public class AlgorithmTestController : Controller {

        // This is were we register what we want to happen on Get requests. 
        // We could change this to any CRUD request, but since this is internal, it is fine with Get
        [HttpGet]
        public IActionResult Get() {
            // This is where our business logic will eventually go
            // I just wanted to return some sample data to make sure
            // the flow of data was correct. From here we will call our
            // main algorithm applications (whatever they may be)
            var result = new[] {
                new { FirstName = "John", LastName = "Doe" },
                new { FirstName = "Mike", LastName = "Smith" }
            };

            // Return status 200 with the result.
            return Ok(result);
        }
    }
}