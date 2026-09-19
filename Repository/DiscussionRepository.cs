using Grievance_Management_System_Project.AppDbContext;
using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Repository.Interfaces;

namespace Grievence_Management_System_Project.Repository
{
    public class DiscussionRepository(GrievanceDbContext grievanceDbContext) : IDiscussionRepository
    {
        public async Task AddMessage(GrievanceMessage grievanceMessage)
        {
            await grievanceDbContext.GrievanceMessages.AddAsync(grievanceMessage);
            await grievanceDbContext.SaveChangesAsync();
        }
    }
}
