using Grievance_Management_System.Request;
using Grievance_Management_System_Project.Model;

namespace Grievance_Management_System_Project.Service.Interfaces
{
    public interface IStudentService
    {
        Task<List<Student>> GetAllStudents();
    }
}
