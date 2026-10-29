using Grievance_Management_System.Constants;
using Grievance_Management_System.Request;
using Grievance_Management_System_Project.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Grievance_Management_System_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController(IStudentService studentService) : ControllerBase
    {
        
        [HttpGet("getAllStudents")]
        public async Task<IActionResult> GetAllStudents()
        {
            var student = await studentService.GetAllStudents();
            return Ok(student);
        }
    }
}
