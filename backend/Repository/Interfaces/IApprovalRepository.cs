using Grievance_Management_System.Auth;
using Grievance_Management_System.Model.Auth;
using Grievance_Management_System.Request;
using Grievance_Management_System_Project.Model;
using Grievence_Management_System_Project.Model;

namespace Grievance_Management_System_Project.Repository.Interfaces
{
    public interface IApprovalRepository
    {
        Task<StaffSignUp> GetStaffRequestId(int id);
        Task<StudentSignUp> GetStudentRequestId(int id);
        void UpdateStaffRequest(StaffSignUp staff);
        Task AddUser(User user);
        Task AddStaff(Staff staff);
        Task Save();
        void UpdateStudentRequest(StudentSignUp student);
        Task AddStudent(Student student);

        Task<Staff> GetStaffCode(string code);
        Task<User> GetUserByEmail(string Email);
        

    }
}
