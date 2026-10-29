using Grievance_Management_System.Constants;
using Grievance_Management_System.Request;
using Grievance_Management_System_Project.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ApprovalController(IApprovalService approvalService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        var token = await approvalService.Login(loginRequest);

        return Ok(new
        {
            message = "Login Success",
            token
        });
    }

    [HttpPost("approveStaff")]
    public async Task<IActionResult> ApproveStaff([FromBody] ApproveStaffDto approveStaffDto)
    {
        await approvalService.ApproveStaff(approveStaffDto);
        return Ok(new { message = ErrorConstant.Approved });
    }

    [HttpPost("approveStudent")]
    public async Task<IActionResult> ApproveStudent([FromBody] ApproveStudentDto approveStudentDto)
    {
        await approvalService.ApproveStudent(approveStudentDto);
        return Ok(new { message = ErrorConstant.Created });
    }
}