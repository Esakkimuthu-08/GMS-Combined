using Grievence_Management_System_Project.Repository.Interfaces;
using Grievence_Management_System_Project.Service.Interfaces;

namespace Grievence_Management_System_Project.Service
{
    public class DiscussionService(IDiscussionRepository discussionRepository) : IDiscussionService
    {
    }
}
