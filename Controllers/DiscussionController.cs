using Grievance_Management_System.Constants;
using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Request;
using Grievence_Management_System_Project.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Grievence_Management_System_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscussionController(IDiscussionService discussionService) : ControllerBase
    {
        [HttpPost("grievanceDiscussion")]
        public async Task<IActionResult> AddMessage([FromBody] GrievanceMessageDto grievanceMessageDto)
        {
            var email = User.FindFirst("Email")?.Value;

            await discussionService.AddMessage(grievanceMessageDto, email);
            return Ok(ErrorConstant.Created);
        }
        [HttpGet("getMessages")]
        public async Task<IActionResult> GetMessages()
        {
            var email = User.FindFirst("Email")?.Value;

            return Ok(await discussionService.GetMessage(email));
        }
    }

}

