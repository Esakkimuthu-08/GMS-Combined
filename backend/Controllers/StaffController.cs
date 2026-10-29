using Grievance_Management_System.Constants;
using Grievance_Management_System.Request;
using Grievance_Management_System_Project.AppDbContext;
using Grievance_Management_System_Project.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Grievence_Management_System_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController(IStaffService staffService) : ControllerBase
    {
        //[Authorize(Roles ="Admin")]

        [HttpPost("createStaff")]
        public async Task<IActionResult> Createstaff([FromBody] StaffRequest staffRequest)
        {
            await staffService.CreateStaff(staffRequest);
            return Ok(ErrorConstant.Created);
        }
        //[Authorize (Roles ="Student")]
        [HttpGet("getAllStaffs")]

        public async Task<IActionResult> GetAllStaffs()
        {
            return Ok(await staffService.GetAllStaffs());
        }
    }
}
