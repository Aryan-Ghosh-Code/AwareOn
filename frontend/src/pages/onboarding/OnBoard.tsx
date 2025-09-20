import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AppNavbar from "../../components/navbars/AppNavbar";

type OnboardForm = {
  ifsc: string;
  account_number: string;
};

const OnBoard = () => {
  const [form, setForm] = useState<OnboardForm>({
    ifsc: "",
    account_number: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "ifsc") {
      // IFSC: uppercase, strip spaces, max 11 chars
      const v = value.toUpperCase().replace(/\s+/g, "").slice(0, 11);
      setForm((p) => ({ ...p, ifsc: v }));
      return;
    }

    if (name === "account_number") {
      // Account number: digits only, up to 18-20 typical (you can adjust)
      const v = value.replace(/[^\d]/g, "").slice(0, 20);
      setForm((p) => ({ ...p, account_number: v }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    // Basic IFSC format: 4 letters + 0 + 6 alphanumerics
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(form.ifsc)) {
      return "Please enter a valid IFSC (e.g., ICIC0005689)";
    }
    if (form.account_number.length < 6) {
      return "Please enter a valid account number (at least 6 digits)";
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
      console.log("Submitting onboard form:", form);
      toast.success("Onboarding info captured (stub). Wire this to your API.");
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AppNavbar />
      <main className="px-6 md:px-12 pt-24 max-w-xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 text-center">
            On Board
          </h1>
          <p className="text-subhead text-center mt-1">
            Provide banking details to get started
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-[#1B2432] border border-[#2298b9]/40 shadow-lg p-6"
        >
          {/* IFSC */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1" htmlFor="ifsc">
              IFSC Code
            </label>
            <input
              id="ifsc"
              name="ifsc"
              value={form.ifsc}
              onChange={onChange}
              placeholder="ICIC0005689"
              autoCapitalize="characters"
              className="w-full rounded-xl bg-[#242038] border border-[#2298b9]/40 focus:border-[#2298b9] focus:ring-[#2298b9] text-gray-100 p-3 outline-none"
            />
            <p className="mt-1 text-xs text-gray-400">
              Format: 4 letters + 0 + 6 alphanumerics (e.g., ICIC0005689)
            </p>
          </div>

          {/* Account Number */}
          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-1" htmlFor="account_number">
              Account Number
            </label>
            <input
              id="account_number"
              name="account_number"
              value={form.account_number}
              onChange={onChange}
              inputMode="numeric"
              placeholder="987654321881"
              className="w-full rounded-xl bg-[#242038] border border-[#2298b9]/40 focus:border-[#2298b9] focus:ring-[#2298b9] text-gray-100 p-3 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl px-6 py-3 text-white font-semibold bg-[#2298b9] hover:bg-[#1f89a7] active:bg-[#1c7b95] shadow-lg shadow-[#2298b9]/30 transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>

          <div className="mt-4 text-center">
            <Link to="/repository/problem" className="text-sm text-[#61C9A8] hover:underline">
              ← Back to Repository
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};

export default OnBoard;
