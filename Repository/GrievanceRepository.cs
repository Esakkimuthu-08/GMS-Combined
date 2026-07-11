using Grievance_Management_System_Project.AppDbContext;
using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Repository.Interfaces;
using Grievence_Management_System_Project.Request;
using Grievence_Management_System_Project.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;

namespace Grievence_Management_System_Project.Repository
{
    public class GrievanceRepository(GrievenceDbContext grievenceDbContext) : IGrievanceRepository
    {
        public async Task AddGrievance(RaiseGrievances raiseGrievances)
        {
          await grievenceDbContext.RaiseGrievances.AddAsync(raiseGrievances);
          await  grievenceDbContext.SaveChangesAsync();
        }

        public async Task<List<RaiseGrievances>> GetAllGrievances()
        {
            return await grievenceDbContext.RaiseGrievances
                .Include(grievance => grievance.Student)
                .ToListAsync();
        }

        public async Task<RaiseGrievances> GetById(int Id)
        {
           return await grievenceDbContext.RaiseGrievances.FirstOrDefaultAsync(ticket => ticket.Id == Id);
        }

        public async Task UpdateStatus(RaiseGrievances grievance)
        {
            grievenceDbContext.RaiseGrievances.Update(grievance);
            await grievenceDbContext.SaveChangesAsync();
        }
    }
}
