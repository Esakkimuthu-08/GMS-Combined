import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { grievanceService } from "./grievanceService";
import { discussionService } from "./discussionService";


export const Hook = {
    StudentGrievances: () => useQuery({
        queryKey: ["student-grievances-list"],
        queryFn: () => grievanceService.getStudentGrievances(),
        select: (res) => res.data?.grievances ?? res.data,
    }),


    DiscussionMessages: (grievanceId) => useQuery({
        queryKey: ["discussion-messages", grievanceId],
        queryFn: async () => {
            try {
                return await discussionService.getMessages(grievanceId);
            } catch (err) {

                if (err.response?.status === 404) {
                    return { data: { messages: [] } };
                }
                throw err;
            }
        },
        select: (res) => res.data?.messages ?? res.data ?? [],
        enabled: Boolean(grievanceId),
    }),


    AddMessage: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ grievanceId, message }) =>
                discussionService.addMessage(grievanceId, message),
            onSuccess: (_data, variables) => {
                queryClient.invalidateQueries({
                    queryKey: ["discussion-messages", variables.grievanceId],
                });
            },
        });
    },
}
