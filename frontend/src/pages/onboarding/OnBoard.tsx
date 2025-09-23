import { useState } from "react";
import toast from "react-hot-toast";
import AppNavbar from "../../components/navbars/AppNavbar";

type Department = {
  name: string;
  contact: string;
};

type OnboardForm = {
  departmentName: string;
  phoneNumber: string;
};

const departmentOptions = [
  "Ministry of Road Transport and Highways",
  "Urban Development Department",
  "Traffic Police Department",
  "Transport Department",
  "Forest Department",
  "Ministry of Environment",
  "Municipal Health Department",
  "Public Works Department (PWD)",
  "Power Supply Department",
  "Municipal Health Department"
];

const OnBoard = () => {
  const [form, setForm] = useState<OnboardForm>({
    departmentName: "",
    phoneNumber: "",
  });
  const [departments, setDepartments] = useState<Department[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      // Phone number: digits only, exactly 10 digits
      const v = value.replace(/[^\d]/g, "").slice(0, 10);
      setForm((p) => ({ ...p, phoneNumber: v }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.departmentName) {
      return "Please select a department name";
    }
    if (form.phoneNumber.length !== 10) {
      return "Please enter a valid phone number (exactly 10 digits)";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    try {
      setSubmitting(true);
      const newDepartment: Department = {
        name: form.departmentName,
        contact: form.phoneNumber,
      };
      setDepartments((prev) => [...prev, newDepartment]);
      setForm({ departmentName: "", phoneNumber: "" });
      toast.success("Department added successfully!");
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const removeDepartment = (index: number) => {
    setDepartments((prev) => prev.filter((_, i) => i !== index));
    toast.success("Department removed successfully!");
  };

  return (
    <>
      <AppNavbar />
      <main className="px-6 md:px-12 pt-24 max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 text-center">
            On Board
          </h1>
          <p className="text-subhead text-center mt-1">
            Add department details to get started
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Form */}
          <div className="rounded-2xl bg-[#1B2432] border border-[#2298b9]/40 shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Add Department</h2>
            <form onSubmit={handleSubmit}>
              {/* Department Name Dropdown */}
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1" htmlFor="departmentName">
                  Department Name
                </label>
                <select
                  id="departmentName"
                  name="departmentName"
                  value={form.departmentName}
                  onChange={onChange}
                  className="w-full rounded-xl bg-[#242038] border border-[#2298b9]/40 focus:border-[#2298b9] focus:ring-[#2298b9] text-gray-100 p-3 outline-none"
                >
                  <option value="">Select a department</option>
                  {departmentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Number */}
              <div className="mb-6">
                <label className="block text-sm text-gray-300 mb-1" htmlFor="phoneNumber">
                  Department Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={onChange}
                  inputMode="numeric"
                  placeholder="1234567890"
                  className="w-full rounded-xl bg-[#242038] border border-[#2298b9]/40 focus:border-[#2298b9] focus:ring-[#2298b9] text-gray-100 p-3 outline-none"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Enter exactly 10 digits
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl px-6 py-3 text-white font-semibold bg-[#2298b9] hover:bg-[#1f89a7] active:bg-[#1c7b95] shadow-lg shadow-[#2298b9]/30 transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {submitting ? "Adding..." : "Add Department"}
              </button>
            </form>
          </div>

          {/* Right Side: Registered Departments */}
          <div className="rounded-2xl bg-[#1B2432] border border-[#2298b9]/40 shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Registered Departments</h2>
            {departments.length === 0 ? (
              <p className="text-gray-400">No departments added yet.</p>
            ) : (
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="bg-[#242038] rounded-xl p-4 border border-[#2298b9]/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-gray-100 font-medium">{dept.name}</h3>
                        <p className="text-gray-300 text-sm">Phone: {dept.contact}</p>
                      </div>
                      <button
                        onClick={() => removeDepartment(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>


      </main>
    </>
  );
};

export default OnBoard;
