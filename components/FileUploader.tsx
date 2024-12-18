"use client";
import { useCallback, useContext, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FunnelContext } from "@/lib/contexts";
import PhoneFrame from "@/components/PhoneFrame";
import Loader from "@/components/ui/Loader";

export default function FileUploader() {
  const [, setFunnel] = useContext(FunnelContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setIsLoading(true);
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const text = event.target?.result;
          const json = JSON.parse(text as string);

          // validate json
          if (!json.name || !json.pages || !Array.isArray(json.pages)) {
            throw new Error("Invalid funnel format");
          }
          setFunnel(json);
          localStorage.setItem("funnel", text as string);
        } catch (error) {
          setError(
            "Failed to parse the funnel file. Please check the file format.",
          );
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError("Error reading the file.");
        setIsLoading(false);
      };
      reader.readAsText(file);
    },
    [setFunnel],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    maxFiles: 1,
  });

  useEffect(() => {
    if (!isDragActive) return;
    setError(null);
  }, [isDragActive, setError]);

  return (
    <PhoneFrame>
      <div
        {...getRootProps()}
        className={`relative w-full h-full flex items-center transition-colors justify-center ${isDragActive ? "bg-sky-500/50" : "bg-white"}`}
      >
        <input {...getInputProps()} id="file-upload" />
        {isLoading ? (
          <Loader />
        ) : (
          <button className="text-center min-h-1/2 grid grid-cols-1 grid-rows-2 gap-4 hover:brightness-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`mx-auto size-12 ${isDragActive ? "text-white" : "text-sky-500"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>

            <div className="text-sm/6 ">
              {isDragActive ? (
                <p className="font-semibold text-white">Drop the file here.</p>
              ) : (
                <>
                  <span className="font-semibold text-sky-500">
                    Upload a your funnel JSON file
                  </span>
                  <br />
                  <span className="text-slate-600">
                    or drag and drop it here.
                  </span>
                </>
              )}
            </div>
          </button>
        )}
        {error && (
          <div className="absolute bottom-12 left-0 right-0 px-12 text-red-500/75 text-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mx-auto mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p>{error}</p>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
