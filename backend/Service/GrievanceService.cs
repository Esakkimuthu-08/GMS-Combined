
using Grievance_Management_System.Auth;
using Grievance_Management_System_Project.Enum;
using Grievance_Management_System_Project.Exceptions;
using Grievance_Management_System_Project.Model;
using Grievance_Management_System_Project.Repository.Interfaces;
using Grievence_Management_System_Project.Enum;
using Grievence_Management_System_Project.Exceptions;
using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Repository;
using Grievence_Management_System_Project.Repository.Interfaces;
using Grievence_Management_System_Project.Request;
using Grievence_Management_System_Project.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Grievence_Management_System_Project.Service
{
    public class GrievanceService(IGrievanceRepository grievanceRepository, IStaffRepository staffRepository, IStudentRepository studentRepository,IDiscussionRepository discussionRepository) : IGrievanceService
    {
        public async Task AddGrievance(GrievanceRequest grievanceRequest, string email)
        {
            Staff incharge = await staffRepository.GetByCategory(grievanceRequest.GrievanceCategory);
            Student student = await studentRepository.GetByEmail(email)
                ?? throw new NotFoundException();


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

            Notification notification = new()
            {
                RecipientEmail = incharge.Email,
                GrievanceId = raiseGrievances.Id,
                Message = "Grievance Successfully Raised and Assigned",
                CreatedAt = DateTime.UtcNow
            };
            await discussionRepository.AddNotification(notification);

        }

        public async Task<List<RaiseGrievances>> GetAllGrievances()
        {
            return await grievanceRepository.GetAllGrievances();
        }

        public async Task UpdateStatus(UpdateStatusDto dto, string email)
        {
            RaiseGrievances grievance =
        await grievanceRepository.GetById(dto.GrievanceId)
        ?? throw new NotFoundException();

            Staff staff = await staffRepository.GetByEmail(email)
                ?? throw new NotFoundException();

            if (grievance.AssignedToStaffId != staff.Id)
                throw new ForbiddenException();

            if (!System.Enum.IsDefined(dto.GrievanceStatus))
            {
                throw new ArgumentException("Invalid grievance status");
            }

            grievance.Status = dto.GrievanceStatus;

            await grievanceRepository.UpdateStatus(grievance);

        }

        public async Task<List<RaiseGrievances>> GetAssignedGrievances(string email)
        {
            Staff staff = await staffRepository.GetByEmail(email);


            return await grievanceRepository.GetAssignedGrievances(staff.Id);
        }

        public async Task<List<RaiseGrievances>> GetStudentGrievances(string email)
        {
        
            Student student = await studentRepository.GetByEmail(email)
                ?? throw new NotFoundException();

            return await grievanceRepository.GetStudentGrievances(student.Id);
        }
    }
}
