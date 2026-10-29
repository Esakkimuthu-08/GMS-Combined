using Grievance_Management_System.Request;

namespace Grievance_Management_System_Project.Service.Interfaces
{
    public interface IApprovalService
    {
        Task ApproveStaff(ApproveStaffDto approveStaffDto);
        Task ApproveStudent(ApproveStudentDto approveStudentDto);
        Task<string> Login(LoginRequest loginRequest);

    }
}
