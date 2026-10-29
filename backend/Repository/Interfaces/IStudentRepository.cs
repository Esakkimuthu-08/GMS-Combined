using Grievance_Management_System_Project.Model;

namespace Grievance_Management_System_Project.Repository.Interfaces
{
    public interface IStudentRepository
    {
        Task<List<Student>> GetAllStudents();
        Task<Student> GetByEmail(string email);
        Task<Student> GetById(int id);
    }
}
