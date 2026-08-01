import { useQuery } from "@tanstack/react-query";
import { grievanceService } from "./grievanceService";


export const Hook = {
    StudentGrievances: () => useQuery({
        queryKey: ["student-grievances-list"],
        queryFn: () => grievanceService.getStudentGrievances(),
        select: (res) => res.data?.grievances ?? res.data,
    })
}