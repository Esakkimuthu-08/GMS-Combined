import React from "react";

export const ViewButton = ({ grievance, cancel, showStudentDetails = false }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[55%] rounded-2xl bg-white shadow-xl">

                <div className="flex items-center bg-[#3A5B22] text-white  justify-between rounded-t-2xl border-b p-5">
                    <h1 className="text-xl font-semibold">Grievance Details</h1>

                    <button
                        onClick={() => cancel(false)}
                        className="rounded px-3 py-1 hover:bg-gray-100"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4 p-8">

                    <div className="flex">
                        <div className="w-1/2 font-semibold">Ticket ID</div>
                        <div className="w-4 text-center">:</div>
                        <div className="flex-1">{grievance.id}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/2 font-semibold">Subject</div>
                        <div className="w-4 text-center">:</div>
                        <div className="flex-1">{grievance.subject}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/2 font-semibold">Description</div>
                        <div className="w-4 text-center">:</div>
                        <div className="flex-1">{grievance.description}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/2 font-semibold">Category</div>
                        <div className="w-4 text-center">:</div>
                        <div className="flex-1">{grievance.grievanceCategory}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/2 font-semibold">Status</div>
                        <div className="w-4 text-center">:</div>
                        <div className="flex-1">{grievance.status}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/2 font-semibold">Created On</div>
                        <div className="w-4 text-center">:</div>
                        <div className="flex-1">{grievance.createdAt}</div>
                    </div>

                    <div className="flex">
                        <div className="w-1/2 font-semibold">Assigned Staff</div>
                        <div className="w-4 text-center">:</div>
                        <div className="flex-1">
                            {grievance.assignedToStaffId ?? "Not Assigned"}
                        </div>
                    </div>

                    {showStudentDetails && grievance.student && (
                        <>
                            <hr className="my-6" />

                            <h2 className="text-lg font-semibold">Student Details</h2>

                            <div className="flex">
                                <div className="w-1/2 font-semibold">Name</div>
                                <div className="w-4 text-center">:</div>
                                <div className="flex-1">{grievance.student.name}</div>
                            </div>

                            <div className="flex">
                                <div className="w-1/2 font-semibold">Roll No</div>
                                <div className="w-4 text-center">:</div>
                                <div className="flex-1">{grievance.student.rollNo}</div>
                            </div>

                            <div className="flex">
                                <div className="w-1/2 font-semibold">Email</div>
                                <div className="w-4 text-center">:</div>
                                <div className="flex-1">{grievance.student.email}</div>
                            </div>

                            <div className="flex">
                                <div className="w-1/2 font-semibold">Phone</div>
                                <div className="w-4 text-center">:</div>
                                <div className="flex-1">{grievance.student.phoneNumber}</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};