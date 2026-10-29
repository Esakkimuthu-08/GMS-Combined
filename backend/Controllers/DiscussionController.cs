using Grievance_Management_System.Constants;
using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Request;
using Grievence_Management_System_Project.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
        public async Task<IActionResult> GetMessages([FromQuery] int grievanceid)
        {
            var email = User.FindFirst("Email")?.Value;

            return Ok(await discussionService.GetMessage(email, grievanceid));
        }

        [HttpPut("messages/markAsRead/{grievanceId}")]
        public async Task<IActionResult> MarkAsRead(int grievanceId)
        {
            string email = User.FindFirst("Email")?.Value
                ?? throw new UnauthorizedAccessException();

            await discussionService.MarkMessagesAsRead(grievanceId, email);

            return Ok(new
            {
                message = "Messages marked as read"
            });
        }

        [HttpGet("GetAllNotification")]

        public async Task<IActionResult> GetAllNotification()
        {
            var notification = await discussionService.GetAllNotification();
            return Ok(notification);
        }

        [HttpGet("GetNotificationByEmail")]

        public async Task<IActionResult> GetNotificationsByEmail()
        {
            var email = User.FindFirst("Email")?.Value;
            return Ok(await discussionService.GetNotificationsByEmail(email));

        }

        [HttpPut("notification/markAsRead/{id}")]

        public async Task<IActionResult> MarkAsReadForNotification([FromRoute] int id)
        {
            string email = User.FindFirst("Email")?.Value;

            await discussionService.MarkAsReadForNotification(email, id);

            return NoContent();

        }

        [HttpGet("unreadMessages")]
        public async Task<IActionResult> GetUnreadMessages()
        {
            string email = User.FindFirst("Email")?.Value
                ?? throw new UnauthorizedAccessException();

            var result = await discussionService.GetUnreadMessages(email);

            return Ok(result);
        }
    }

}

