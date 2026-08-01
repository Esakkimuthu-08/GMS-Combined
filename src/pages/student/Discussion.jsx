import { StudentLayout } from "@/layouts/StudentLayout";
import { Hook } from "@/api/hook";
import { TableRowSkeleton } from "@/components/common/SkeletonLoader";


function StudentDiscussion() {

    const { data, isLoading, isError, error } = Hook.StudentGrievances();

    const grievances = data || [];



    return (
        <StudentLayout>
            <div className="flex-1 overflow-y-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Student Discussion</h1>
                <p className="text-sm text-gray-500">Join the discussion and share your thoughts</p>

                {isError && (
                    <ErrorMessage
                        message={error?.response?.data?.message || "Failed to load grievances. Showing cached data."}
                        className="mb-6"
                    />
                )}

                <div className=" grid grid-flow-row">

                    {isLoading ? Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton />) : grievances.map((grievance) => (
                        <div key={grievance.id} className=" grid grid-flow-col bg-white shadow-md rounded-xl">
                            <p className="font-semibold">p</p>
                            <p>{grievance.subject}</p>
                        </div>
                    ))}

                </div>


            </div>
        </StudentLayout>
    );
}

export default StudentDiscussion;