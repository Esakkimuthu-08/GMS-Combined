import React from "react";
import { MdCancelPresentation } from "react-icons/md";
import { getStatusBadgeClass, getStatusLabel } from "../utils/statusHelpers";
import { formatDate } from "../utils/tokenUtils";

const DetailRow = ({ label, children }) => (
    <div className="flex min-w-0 flex-col gap-1 md:flex-row md:gap-0">
        <div className="font-semibold md:w-1/2">{label}</div>
        <div className="hidden w-4 text-center md:block">:</div>
        <div className="min-w-0 flex-1 break-words [overflow-wrap:anywhere]">{children}</div>
    </div>
);

export const ViewButton = ({ grievance, cancel, showStudentDetails = false }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 md:p-0">
            <div className="flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:w-[55%]">

                <div className="flex shrink-0 items-center justify-between border-b bg-[#3A5B22] p-4 text-white sm:p-5">
                    <h1 className="text-lg font-semibold sm:text-xl">Grievance Details</h1>

                    <button
                        type="button"
                        onClick={() => cancel(false)}
                        aria-label="Close grievance details"
                        className="rounded p-2 hover:bg-gray-100 hover:text-black"
                    >
                        <MdCancelPresentation size={26} />
                    </button>
                </div>

                <div className="min-h-0 space-y-4 overflow-y-auto p-4 md:p-8">

                    <DetailRow label="Ticket ID">{grievance.ticketId}</DetailRow>

                    <DetailRow label="Subject">{grievance.subject}</DetailRow>

                    <DetailRow label="Description">{grievance.description}</DetailRow>

                    <DetailRow label="Category">{grievance.grievanceCategory}</DetailRow>

                    <DetailRow label="Status">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(grievance.status)}`}>
                            {getStatusLabel(grievance.status)}
                        </span>
                    </DetailRow>

                    <DetailRow label="Created On">{formatDate(grievance.createdAt)}</DetailRow>

                    <DetailRow label="Assigned Staff">{grievance.assignedToStaff?.name ?? "Not Assigned"}</DetailRow>

                    {showStudentDetails && grievance.student && (
                        <>
                            <hr className="my-6" />

                            <h2 className="text-lg font-semibold">Student Details</h2>

                            <DetailRow label="Name">{grievance.student.name}</DetailRow>

                            <DetailRow label="Roll No">{grievance.student.rollNo}</DetailRow>

                            <DetailRow label="Email">{grievance.student.email}</DetailRow>

                            <DetailRow label="Phone">{grievance.student.phoneNumber}</DetailRow>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
