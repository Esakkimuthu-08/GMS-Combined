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
        // Always re-fetch when a different grievance is selected.
        staleTime: 0,
        // Client-side guard: keep only messages that belong to this grievance.
        // Protects against a backend that returns all messages regardless of the
        // grievanceId query param.
        select: (res) => {
            const all = res.data?.messages ?? res.data ?? [];
            if (!Array.isArray(all)) return [];
            return all.filter(
                (m) => String(m.grievanceId ?? m.GrievanceId) === String(grievanceId)
            );
        },
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
