import { StudentLayout } from "../../layouts/StudentLayout";
import { useState } from "react";
import { Upload, X, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { grievanceService } from "../../api/grievanceService";
import ErrorMessage from "../../components/common/ErrorMessage";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const CATEGORIES = [
  { label: "Academic", value: 1 },
  { label: "Attendance", value: 2 },
  { label: "Facilities", value: 3 },
  { label: "Staff Conduct", value: 4 },
  { label: "Hostel", value: 5 },
  { label: "Other", value: 6 },
];
export default function RaiseGrievance() {
  const [formData, setFormData] = useState({ GrievanceCategory: "", subject: "", description: "" });
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (payload) => grievanceService.raiseGrievance(payload),
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ GrievanceCategory: "", subject: "", description: "" });
      setFiles([]);
      setTimeout(() => setSubmitted(false), 4000);
    },
  });
  console.log(formData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "GrievanceCategory"
          ? Number(value)
          : value,
    }));
  };
  const handleFileChange = (e) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const removeFile = (index) => setFiles(files.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...formData, files });
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3A5B22]/40 focus:border-[#3A5B22] transition";

  return (
    <StudentLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Raise New Grievance</h1>
        <p className="text-sm text-gray-500 mb-6">Fill in the details below to submit your complaint</p>

        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 flex items-center gap-2 text-sm font-medium">
            <CheckCircle size={16} />
            Grievance submitted successfully! We'll get back to you soon.
          </div>
        )}

        {isError && (
          <ErrorMessage
            message={error?.response?.data?.message || "Failed to submit grievance. Please try again."}
            className="mb-6"
          />
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border shadow-sm p-6 space-y-5">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Grievance Category <span className="text-red-500">*</span>
            </label>
            <select
              name="GrievanceCategory"
              value={formData.GrievanceCategory}
              onChange={handleInputChange}
              required
              className={inputClass}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Brief title of your grievance"
              required
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              required
              placeholder="Describe your grievance in detail..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments <span className="text-gray-400 font-normal">(Optional)</span>
            </label>

            <label
              htmlFor="file-input"
              className="cursor-pointer flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-[#3A5B22] hover:bg-green-50 transition-colors text-gray-500 hover:text-[#3A5B22]"
            >
              <Upload size={28} />
              <p className="text-sm font-medium">Click to upload files</p>
              <p className="text-xs text-gray-400">Images, PDFs supported</p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
            </label>

            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 border rounded-lg">
                    <span className="text-sm text-gray-700 truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-[#3A5B22] hover:bg-[#2e4a1a] text-white rounded-lg font-semibold text-sm transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending && <LoadingSpinner size="sm" className="text-white" />}
              {isPending ? "Submitting..." : "Submit Grievance"}
            </button>
            <button
              type="button"
              onClick={() => { setFormData({ category: "", subject: "", description: "" }); setFiles([]); }}
              className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </StudentLayout>
  );
}
