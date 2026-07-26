import { StudentLayout } from "@/layouts/StudentLayout";


function StudentDiscussion() {
    return (
        <StudentLayout>
            <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Discussion</h1>
                    <p className="text-gray-500">Join the discussion and share your thoughts</p>
                </div>
            </div>
        </StudentLayout>
    );
}

export default StudentDiscussion;