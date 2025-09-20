import { useState } from "react";
import ProjectDetailsForm from "../../components/project/ProjectDetailsForm";
import type { ProjectDetailsState } from "../../components/project/ProjectDetailsForm";
import ProjectExtrasForm from "../../components/project/ProjectExtrasForm";
import type { ProjectExtrasState } from "../../components/project/ProjectExtrasForm";
import useUploadProject from "../../hooks/useUploadProject";
import AppNavbar from "../../components/navbars/AppNavbar";

const toDDMMYYYY = (input: string) => {
  if (!input) return "";
  const [y, m, d] = input.split("-");
  return `${d}-${m}-${y}`;
};

const cleanArray = (arr: string[]) => arr.map((o) => o.trim()).filter(Boolean);

const ProjectUpload = () => {
  const [details, setDetails] = useState<ProjectDetailsState>({
    name: "",
    city: "",
    state: "",
    start: "",
    end: "",
    aim: "",
  });
  const [extras, setExtras] = useState<ProjectExtrasState>({
    sdg: [],
    description: "",
    objectives: [""],
    target: "",
    tariff: [1000, 2500, 7500],
  });
  const { loading, uploadProject } = useUploadProject();

  const handleSubmit = async () => {
    const payload = {
      name: details.name.trim(),
      city: details.city.trim(),
      state: details.state.trim(),
      startDate: toDDMMYYYY(details.start),
      endDate: toDDMMYYYY(details.end),
      SDG: extras.sdg,
      aim: details.aim.trim(),
      description: extras.description.trim(),
      objectives: cleanArray(extras.objectives),
      target: Number(extras.target),
      tariff: extras.tariff.filter((t) => t > 0),
    };

    await uploadProject(payload);
  };

  return (
    <>
      <AppNavbar />

      <div className="w-full lg:w-[80%] mx-auto px-6 md:px-10 pt-22 pb-6">
        <header className="mb-8 flex items-center justify-center w-full flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 text-center">
            UPLOAD YOUR PROJECT
          </h1>
          <p className="text-gray-300 text-lg italic  text-center">
            Step 1: Enter details. Step 2: Add description, SDGs, objectives, and donation plans.
          </p>
        </header>


        <section className="grid grid-cols-1 gap-8">
          <ProjectDetailsForm value={details} onChange={setDetails} />
          <ProjectExtrasForm
            value={extras}
            onChange={setExtras}
            onSubmit={handleSubmit}
            submitting={loading}
          />
        </section>
      </div>
    </>
  );
};

export default ProjectUpload;
