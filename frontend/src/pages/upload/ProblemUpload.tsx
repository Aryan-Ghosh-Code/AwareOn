import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Webcam from "react-webcam";
import { uploadBlobToCloudinary } from "../../utils/uploadToCloudinary";
import { getUserCoordinates } from "../../utils/getCoordinates";
import usePostProblem from "../../hooks/usePostProblem";
import Spinner from "../../components/Spinner";
import AppNavbar from "../../components/navbars/AppNavbar";

type CaptureMode = "none" | "camera" | "upload";

const ProblemUpload = () => {
  const [mode, setMode] = useState<CaptureMode>("none");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const { loading, postProblem } = usePostProblem();
  const [prediction, setPrediction] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);

  const webcamRef = useRef<Webcam | null>(null);

  const handleMode = (newMode: CaptureMode) => {
    setImageFile(null);
    setImagePreview(null);
    setMode(newMode);
  };

  const capturePhoto = async () => {
    if (!webcamRef.current) return;

    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) return;

    try {
      const response = await fetch(screenshot);
      const blob = await response.blob();
      const file = new File([blob], `capture-${Date.now()}.png`, {
        type: "image/png",
      });

      setImageFile(file);
      setUploading(true);

      const uploadedUrl = await uploadBlobToCloudinary(screenshot, "image");
      if (!uploadedUrl) throw new Error("Failed to upload media");
      setImagePreview(uploadedUrl);
    } catch (error) {
      toast.error("Error in capturing/uploading picture");
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);

    try {
      setUploading(true)
      const uploadedUrl = await uploadBlobToCloudinary(url, "image");
      if (!uploadedUrl) throw new Error("Failed to upload media");
      setImagePreview(uploadedUrl);
    } catch {
      toast.error("Error in uploading picture");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !imagePreview) {
      toast.error("Please capture or upload an image");
      return;
    }

    const { lat, lon } = await getUserCoordinates();
    const data = await postProblem({
      url: imagePreview,
      description,
      lat,
      lon
    });
    setPrediction(data);
  };

  return (
    <>
      <AppNavbar />

      <div className="mx-auto w-full lg:w-[80%] px-6 md:px-10 pt-22 pb-6">
        <header className="mb-8 flex items-center justify-center w-full flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 text-center">
            UPLOAD YOUR PROBLEM
          </h1>
          <p className="text-gray-300 text-lg italic  text-center">
            Capture a photo using your camera or upload an existing image.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Mode selection */}
          <section className="lg:col-span-1">
            <div className="rounded-2xl bg-[#242038] p-5 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-100">Choose an option</h2>
              <div className="mt-4 flex flex-col gap-3">
                <button
                  onClick={() => handleMode("camera")}
                  className={`w-full rounded-xl py-3 font-medium text-white cursor-pointer transition hover:scale-105 ${mode === "camera"
                    ? "bg-[#71af3e]"
                    : "bg-[#71af3e] hover:bg-[#49752b]"
                    }`}
                  disabled={uploading || loading}
                >
                  {uploading ? <Spinner size="small" /> : "Capture Image"}
                </button>
                <label
                  className={`w-full rounded-xl py-3 text-center font-medium text-white cursor-pointer transition hover:scale-105 ${mode === "upload"
                    ? "bg-[#2298b9]"
                    : "bg-[#2298b9] hover:bg-[#1d4d86]"
                    }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleMode("upload");
                      onFileChange(e);
                    }}
                    className="hidden"
                  />
                  {uploading ? <Spinner size="small" /> : "Upload Image"}
                </label>
              </div>
            </div>
          </section>

          {/* Center: Camera / Upload area */}
          <section className="lg:col-span-2">
            <div className="rounded-2xl bg-[#242038] p-5 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-100">Preview</h2>

              {/* Camera view */}
              {mode === "camera" && !imagePreview && (
                <div className="mt-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    <Webcam
                      ref={webcamRef}
                      screenshotFormat="image/png"
                      mirrored={true}
                      videoConstraints={{ facingMode: "environment" }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={capturePhoto}
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 font-medium transition hover:scale-105 cursor-pointer"
                    >
                      Capture Photo
                    </button>
                    <button
                      onClick={() => handleMode("none")}
                      className="rounded-xl bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 font-medium transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Image preview */}
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Selected problem"
                    className="w-full rounded-xl object-cover"
                  />
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={removeImage}
                      className="rounded-xl bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 font-medium transition cursor-pointer"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              )}

              {/* Placeholder */}
              {mode === "none" && !imagePreview && (
                <div className="mt-6 rounded-xl border border-dashed border-[#A1B5D8] p-8 text-center text-subhead bg-[#22333B]">
                  Choose “Capture Image” or “Upload Image”.
                </div>
              )}

              {/* Description */}
              <div className="mt-6">
                <label
                  htmlFor="desc"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Description (optional)
                </label>
                <textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe what you see…"
                  className="w-full rounded-xl bg-[#22333B] border border-[#A1B5D8] focus:border-emerald-500 focus:ring-emerald-500 text-gray-100 p-3 outline-none resize-none"
                />
              </div>

              {/* Prediction panel */}
              {prediction && (
                <div className="mt-6 rounded-2xl bg-[#1B2432]/60 border border-[#2298b9]/40 p-5">
                  <h3 className="text-lg font-semibold text-gray-100 mb-3">
                    Model Prediction
                  </h3>

                  {/* Confidence + Class */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-[#242038] p-4">
                      <p className="text-sm text-gray-300">Problem</p>
                      <p className="text-xl font-semibold text-[#61C9A8]">
                        {prediction.problem}
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#242038] p-4">
                      <p className="text-sm text-gray-300">Confidence Score</p>
                      <p className="text-xl font-semibold text-[#61C9A8]">
                        {(prediction.confidence * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  {/* SDGs */}
                  <div className="mt-4">
                    <p className="text-sm text-gray-300 mb-2">SDG Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {(prediction.SDG || [])
                        .map((sdg: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-[#6290C3] text-[#242038] text-sm font-medium"
                          >
                            SDG {sdg}
                          </span>
                        ))}
                      {!prediction.SDG && (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </div>
                  </div>

                  {/* Actionable Insights */}
                  <div className="mt-4">
                    <p className="text-sm text-gray-300 mb-2">Actionable Insights</p>
                    {Array.isArray(prediction.actionableInsights) &&
                      prediction.actionableInsights.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1 text-gray-200">
                        {prediction.actionableInsights.map((tip: string, idx: number) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 text-sm">No insights provided.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Submit */}
              {!prediction && (
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={handleSubmit}
                    className="rounded-xl bg-[#744253] hover:bg-red-600 text-white px-6 py-3 font-semibold transition hover:scale-105 cursor-pointer"
                    disabled={loading || uploading || !imagePreview || !imageFile}
                  >
                    {loading ? <Spinner size="small" /> : "Submit Problem"}
                  </button>
                  <p className="text-xs text-[#ffffff]">
                    Ensure the photo is original and taken at the incident location/time.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProblemUpload;