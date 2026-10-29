namespace Grievence_Management_System_Project.Request
{
    public class NotificationDto
    {
        public string RecipientEmail { get; set; }
        public int GrievanceId { get; set; }
        public string Message { get; set; }
    }
}
