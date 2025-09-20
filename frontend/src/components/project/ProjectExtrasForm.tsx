import React, { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";

const SDG_OPTIONS_WITH_TITLES: { code: string; title: string }[] = [
  { code: "13.1", title: "Resilience to climate-related hazards and disasters" },
  { code: "13.2", title: "Integrate climate measures into policies and planning" },
  { code: "13.3", title: "Education and awareness on climate change" },
  { code: "14.1", title: "Reduce marine pollution (incl. plastics)" },
  { code: "14.2", title: "Protect and restore marine ecosystems" },
  { code: "14.3", title: "Reduce and address ocean acidification" },
  { code: "14.4", title: "Sustainable fishing; end overfishing & IUU" },
  { code: "14.5", title: "Conserve coastal and marine areas" },
  { code: "14.6", title: "Eliminate harmful fisheries subsidies" },
  { code: "14.7", title: "Benefits from sustainable marine resources" },
  { code: "14.a", title: "Marine science knowledge & technology" },
  { code: "14.b", title: "Access for small-scale artisanal fishers" },
  { code: "14.c", title: "Implement international ocean law (UNCLOS)" },
  { code: "15.1", title: "Conserve terrestrial & freshwater ecosystems" },
  { code: "15.2", title: "Sustainable forest management; halt deforestation" },
  { code: "15.3", title: "Combat desertification & land degradation" },
  { code: "15.4", title: "Conserve mountain ecosystems" },
  { code: "15.5", title: "Reduce biodiversity loss; protect species" },
  { code: "15.6", title: "Fair benefit-sharing of genetic resources" },
  { code: "15.7", title: "End poaching & illegal wildlife trade" },
  { code: "15.8", title: "Prevent/control invasive alien species" },
  { code: "15.9", title: "Integrate biodiversity into planning & accounts" },
];

export type ProjectExtrasState = {
  sdg: string[];
  description: string;
  objectives: string[];
  target: string;
  tariff: number[];
};

type Props = {
  value: ProjectExtrasState;
  onChange: (next: ProjectExtrasState) => void;
  onSubmit: () => void;
  submitting?: boolean;
};

const ProjectExtrasForm: React.FC<Props> = ({ value, onChange, onSubmit, submitting }) => {
  const [openSdg, setOpenSdg] = useState(false);
  const sdgDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (openSdg && sdgDropdownRef.current && !sdgDropdownRef.current.contains(e.target as Node)) {
        setOpenSdg(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [openSdg]);

  const update = (patch: Partial<ProjectExtrasState>) => onChange({ ...value, ...patch });

  const toggleSDG = (code: string) =>
    update({
      sdg: value.sdg.includes(code)
        ? value.sdg.filter((c) => c !== code)
        : [...value.sdg, code],
    });

  const selectGroup = (prefix: "13" | "14" | "15") =>
    update({
      sdg: SDG_OPTIONS_WITH_TITLES.filter((o) => o.code.startsWith(prefix)).map((o) => o.code),
    });

  const clearSdg = () => update({ sdg: [] });

  const updateTariff = (idx: number, v: string) => {
    const num = Number(v.replace(/[^\d]/g, ""));
    update({
      tariff: value.tariff.map((t, i) => (i === idx ? (isNaN(num) ? 0 : num) : t)),
    });
  };

  return (
    <div className="rounded-2xl bg-[#242038] p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Description, SDGs & Plans</h2>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm text-[#E2DBBE] mb-1">Description *</label>
        <textarea
          rows={5}
          value={value.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Describe your project scope, methods, and expected impact…"
          className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
        />
      </div>

      {/* SDG Dropdown */}
      <div className="mb-6" ref={sdgDropdownRef}>
        <label className="block text-sm text-[#E2DBBE] mb-2">SDGs *</label>
        <button
          type="button"
          onClick={() => setOpenSdg((v) => !v)}
          className="w-full flex items-center justify-between rounded-xl bg-gray-900/70 border border-gray-700 text-gray-100 px-4 py-3 hover:border-gray-600 transition"
        >
          <span className="flex flex-wrap gap-2">
            {value.sdg.length === 0 ? (
              <span className="text-gray-400">Select SDG targets…</span>
            ) : (
              <>
                {value.sdg.slice(0, 3).map((code) => (
                  <span
                    key={code}
                    className="px-2 py-0.5 text-sm rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-600/30"
                  >
                    {code}
                  </span>
                ))}
                {value.sdg.length > 3 && (
                  <span className="text-sm text-gray-400">+{value.sdg.length - 3} more</span>
                )}
              </>
            )}
          </span>
          <svg
            className={`h-5 w-5 text-gray-300 transition-transform ${openSdg ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {openSdg && (
          <div className="absolute z-20 mt-2 w-full max-w-5xl max-h-72 overflow-auto rounded-xl bg-gray-900 border border-gray-700 shadow-xl">
            <div className="sticky top-0 bg-gray-900 p-3 border-b border-gray-800 flex gap-2 text-xs">
              <button onClick={clearSdg} className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-200">Clear</button>
              <button onClick={() => selectGroup("13")} className="px-2 py-1 rounded bg-blue-600/20 text-blue-300 hover:bg-blue-600/30">SDG 13</button>
              <button onClick={() => selectGroup("14")} className="px-2 py-1 rounded bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/30">SDG 14</button>
              <button onClick={() => selectGroup("15")} className="px-2 py-1 rounded bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30">SDG 15</button>
            </div>

            <ul className="divide-y divide-gray-800">
              {SDG_OPTIONS_WITH_TITLES.map(({ code, title }) => {
                const checked = value.sdg.includes(code);
                return (
                  <li key={code} className="flex items-start gap-3 p-3 hover:bg-gray-800/70">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSDG(code)}
                      className="mt-1 h-4 w-4 accent-emerald-600"
                    />
                    <label className="flex-1 cursor-pointer">
                      <div className="text-sm font-semibold text-gray-100">{code}</div>
                      <div className="text-sm text-gray-300">{title}</div>
                    </label>
                    {checked && <span className="text-emerald-400 text-xs font-medium">Selected</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Objectives */}
      <div className="mb-6">
        <label className="block text-sm text-[#E2DBBE] mb-2">Objectives *</label>
        <div className="flex flex-col gap-3">
          {value.objectives.map((obj, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={obj}
                onChange={(e) =>
                  update({
                    objectives: value.objectives.map((o, idx) =>
                      idx === i ? e.target.value : o
                    ),
                  })
                }
                placeholder={`Objective ${i + 1}`}
                className="flex-1 rounded-xl bg-gray-900/70 border border-gray-700 text-gray-100 p-3 outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  update({
                    objectives: value.objectives.filter((_, idx) => idx !== i),
                  })
                }
                className="px-3 rounded-xl bg-[#744253] hover:bg-red-600 text-white transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => update({ objectives: [...value.objectives, ""] })}
            className="self-start mt-1 px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-sm transition"
          >
            + Add Objective
          </button>
        </div>
      </div>

      {/* Numeric Target */}
      <div className="mb-6">
        <label className="block text-sm text-[#E2DBBE] mb-1">Target Value *</label>
        <input
          type="text"
          value={value.target}
          onChange={(e) => update({ target: e.target.value })}
          className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
        />
      </div>

      {/* Tariff */}
      <div className="mb-6">
        <label className="block text-sm text-[#E2DBBE] mb-2">Donation Plans (Tariff) *</label>
        <div className="flex flex-col gap-3">
          {value.tariff.map((amt, i) => (
            <div key={i} className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                <input
                  value={amt}
                  onChange={(e) => updateTariff(i, e.target.value)}
                  inputMode="numeric"
                  className="w-full rounded-xl bg-gray-900/70 border border-gray-700 text-gray-100 p-3 pl-7 outline-none"
                />
              </div>
              {value.tariff.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    update({ tariff: value.tariff.filter((_, idx) => idx !== i) })
                  }
                  className="px-3 rounded-xl bg-[#744253] hover:bg-red-600 text-white transition"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {value.tariff.length < 3 && (
            <button
              type="button"
              onClick={() => update({ tariff: [...value.tariff, 0] })}
              className="self-start mt-1 px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-sm transition"
            >
              + Add Tariff
            </button>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="rounded-xl bg-[#2298b9]
                     hover:bg-[#1d4d86] disabled:opacity-60 text-white px-6 py-3 font-semibold transition hover:scale-105"
        >
          {submitting ? <Spinner size="small" /> : "Create Project"}
        </button>
        <p className="text-xs text-[#ffffff]">You can edit details later in project settings.</p>
      </div>
    </div>
  );
};

export default ProjectExtrasForm;