namespace Grievence_Management_System_Project.Model
{
    public class Notification
    {
        public int Id { get; set; }
        public string RecipientEmail { get; set; }
        public int GrievanceId { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; }
    }
}
