using System.ComponentModel.DataAnnotations;

namespace Grievence_Management_System_Project.Request
{
    public class GrievanceMessageDto
    {
        [Required]
        public int GrievanceId { get; set; }
        [Required]

        public string Message { get; set; }
    }
}
