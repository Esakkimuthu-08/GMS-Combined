using Grievance_Management_System_Project.AppDbContext;
using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Repository.Interfaces;
using Grievence_Management_System_Project.Response;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Grievence_Management_System_Project.Repository
{
    public class DiscussionRepository(GrievanceDbContext grievanceDbContext) : IDiscussionRepository
    {
        public async Task AddMessage(GrievanceMessage grievanceMessage)
        {
            await grievanceDbContext.GrievanceMessages.AddAsync(grievanceMessage);
            await grievanceDbContext.SaveChangesAsync();
        }

        public async Task<List<GrievanceMessageResponseDto>> GetMessagesByGrievanceIds(List<int> grievanceIds)
        {
            return await grievanceDbContext.GrievanceMessages.
                  Where(messages => grievanceIds.
                  Contains(messages.GrievanceId)).
                  Select(message => new GrievanceMessageResponseDto
                  {
                      Id = message.Id,
                      GrievanceId = message.GrievanceId,
                      Sender = message.Sender,
                      Message = message.Message,
                      CreatedAt = message.CreatedAt
                  }).
                  ToListAsync();
        }
    }
}
