using Grievance_Management_System.Constants;
using Grievance_Management_System.Request;
using Grievance_Management_System_Project.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Grievance_Management_System_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("staffSignUp")]
        [Authorize]
        public async Task<IActionResult> StaffSignup([FromBody] StaffSignUpRequest staffSignUpRequest)
        {
            await authService.StaffSignUp(staffSignUpRequest);
            return Ok(new { message = ErrorConstant.Created });
        }
        
        [HttpGet("getAllStaffSignUp")]
        public async Task<IActionResult> GetAllStaffRequest()
        {
            var staffSignUp = await authService.GetAllStaffSignUp();
            return Ok(staffSignUp);
        }

        [HttpPost("studentSignUp")]
        public async Task<IActionResult> StudentSignUp([FromBody] StudentSignUpRequest studentSignUpRequest)
        {
            await authService.StudentSignUp(studentSignUpRequest);
            return Ok(new { message = ErrorConstant.Created });
        }
        [HttpGet("getAllStudentSignUp")]
        public async Task<IActionResult> GetAllStudentSignUp()
        {
            var studentSignUp = await authService.GetAllStudentSignUp();
            return Ok(studentSignUp);
        }

        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var Users = await authService.GetAllUsers();
            return Ok(Users);
            
        }
    }
}