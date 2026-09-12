using Grievance_Management_System.Auth;
using Grievance_Management_System.Constants;
using Grievence_Management_System_Project.Request;
using Grievence_Management_System_Project.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Grievence_Management_System_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrievanceController(IGrievanceService grievanceService) : ControllerBase
    {
        [HttpPost("raiseGrievance")]
        public async Task<IActionResult> AddGrievance([FromBody] GrievanceRequest grievanceRequest)
        {
            var email = User.FindFirst("Email")?.Value;
            Console.WriteLine(email);

            await grievanceService.AddGrievance(grievanceRequest, email);
            return Ok(ErrorConstant.Created);
        }
        [HttpGet("getAllGrievances")]

        public async Task<IActionResult> GetAllGrievances()
        {
            return Ok(await grievanceService.GetAllGrievances());
        }

        [HttpPut("updateStatus")]

        public async Task<IActionResult> UpdateStatus([FromBody] UpdateStatusDto updateStatusDto)
        {
            await grievanceService.UpdateStatus(updateStatusDto);
            return Ok(ErrorConstant.Created);
        }

        [HttpGet("assigned")]
        public async Task<IActionResult> GetAssignedGrievances()
        {
            var email = User.FindFirst("Email")?.Value;

            return Ok(await grievanceService.GetAssignedGrievances(email));
        }

        [HttpGet("getStudentGrievances")]
        public async Task<IActionResult> GetStudentGrievances()
        {
            var email = User.FindFirst("Email")?.Value;

            return Ok(await grievanceService.GetStudentGrievances(email));
        }
    }
}
