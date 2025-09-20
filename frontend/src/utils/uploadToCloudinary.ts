import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

export const uploadBlobToCloudinary = async (
    fileUrl: string,
    type: "image" | "video"
): Promise<string | null> => {
    const CLOUDINARY_IMAGE_URL = import.meta.env.VITE_CLOUDINARY_IMAGE_URL;
    const CLOUDINARY_VIDEO_URL = import.meta.env.VITE_CLOUDINARY_VIDEO_URL;
    const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

    const cloudinaryUrl = type === "image" ? CLOUDINARY_IMAGE_URL : CLOUDINARY_VIDEO_URL;

    const formData = new FormData();
    formData.append("upload_preset", CLOUDINARY_PRESET);

    try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error(`Failed to fetch blob: ${response.status}`);
        const blob = await response.blob();

        let fileToUpload: File;

        if (type === "image") {
            fileToUpload = await imageCompression(blob as File, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            });
        } else {
            // video – use original blob
            fileToUpload = new File([blob], "upload.mp4", {
                type: blob.type,
                lastModified: Date.now(),
            });
        }

        formData.append("file", fileToUpload);

        const res = await fetch(cloudinaryUrl, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error?.message || "Upload failed");

        return data.secure_url;
    } catch (error) {
        console.error("Error uploading file: ", error);
        toast.error("Couldn't upload file");
        return null;
    }
};