
using Grievance_Management_System.Auth;
using Grievance_Management_System_Project.Enum;
using Grievance_Management_System_Project.Model;
using Grievance_Management_System_Project.Repository.Interfaces;
using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Repository.Interfaces;
using Grievence_Management_System_Project.Request;
using Grievence_Management_System_Project.Service.Interfaces;

namespace Grievence_Management_System_Project.Service
{
    public class GrievanceService(IGrievanceRepository grievanceRepository, IStaffRepository staffRepository, IStudentRepository studentRepository) : IGrievanceService
    {
        public async Task AddGrievance(GrievanceRequest grievanceRequest, string email)
        {
            Staff incharge = await staffRepository.GetByCategory(grievanceRequest.GrievanceCategory);
            Student student = await studentRepository.GetByEmail(email);


            RaiseGrievances raiseGrievances = new RaiseGrievances()
            {
                GrievanceCategory = grievanceRequest.GrievanceCategory,
                Subject = grievanceRequest.Subject,
                Description = grievanceRequest.Description,
                CreatedAt = DateTime.Now,
                Status = Enum.GrievanceStatus.Pending,
                StudentId = student.Id,
                AssignedToStaffId = incharge.Id,

            };
            await grievanceRepository.AddGrievance(raiseGrievances);

        }

        public async Task<List<RaiseGrievances>> GetAllGrievances()
        {
            return await grievanceRepository.GetAllGrievances();
        }

        public async Task UpdateStatus(UpdateStatusDto updateStatusDto)
        {
            RaiseGrievances grievance = await grievanceRepository
        .GetById(updateStatusDto.GrievanceId) ?? throw new Exception("Grievance not found");

            grievance.Status = updateStatusDto.GrievanceStatus;

            await grievanceRepository.UpdateStatus(grievance);

        }

        public async Task<List<RaiseGrievances>> GetAssignedGrievances(string email)
        {
            Staff staff = await staffRepository.GetByEmail(email);

            return await grievanceRepository.GetAssignedGrievances(staff.Id);
        }

        public async Task<List<RaiseGrievances>> GetStudentGrievances(string email)
        {
            Student student = await studentRepository.GetByEmail(email);

            return await grievanceRepository.GetStudentGrievances(student.Id);
        }
    }
}
