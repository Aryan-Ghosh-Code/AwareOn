import { useEffect, useState } from "react";
import AppNavbar from "../../components/navbars/AppNavbar";
import type { DepartmentProps } from "../../types";
import { departmentOptions } from "../../constants/departments";
import useGetMyMinistries from "../../hooks/useGetMyMinistries";
import useRegisterMinistry from "../../hooks/useRegisterMinistry";
import Spinner from "../../components/Spinner";

const OnBoard = () => {
  const [form, setForm] = useState<DepartmentProps>({
    name: "",
    contact: "",
  });
  const [departments, setDepartments] = useState<DepartmentProps[] | null>(null);
  const { loading, getMyMinistries } = useGetMyMinistries();
  const { loading: registering, registerMinistry } = useRegisterMinistry();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "contact") {
      const v = value.replace(/[^\d]/g, "").slice(0, 10);
      setForm((p) => ({ ...p, contact: v }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const fetchMinistries = async () => {
    const data = await getMyMinistries();
    setDepartments(data);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await registerMinistry(form);
    setDepartments(data);
  };

  useEffect(() => {
    fetchMinistries();
  }, []);

  if (loading || !departments) {
    return (
      <div className="flex items-center justify-center h-screen text-white p-6">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <>
      <AppNavbar />
      <main className="px-6 md:px-12 pt-24 max-w-7xl mx-auto pb-8">
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
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1" htmlFor="departmentName">
                  Department Name
                </label>
                <select
                  id="name"
                  name="name"
                  value={form.name}
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

              <div className="mb-6">
                <label className="block text-sm text-gray-300 mb-1" htmlFor="phoneNumber">
                  Department Phone Number
                </label>
                <input
                  id="contact"
                  name="contact"
                  value={form.contact}
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
                disabled={registering}
                className="w-full rounded-xl px-6 py-3 text-white font-semibold bg-[#2298b9] hover:bg-[#1f89a7] active:bg-[#1c7b95] shadow-lg shadow-[#2298b9]/30 transition-transform hover:scale-[1.02] disabled:opacity-60 cursor-pointer"
              >
                {registering ? "Adding..." : "Add Department"}
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
