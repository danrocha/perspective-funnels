"use client";
import { useCallback, useContext, useEffect } from "react";
import { FunnelContext } from "@/lib/contexts";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import PhoneFrame from "./PhoneFrame";

export function FileUploader({
  autoOpenFileInput,
  onOpenFileInputDialog,
}: {
  autoOpenFileInput: boolean;
  onOpenFileInputDialog: VoidFunction;
}) {
  const [funnel, setFunnel] = useContext(FunnelContext);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
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
          toast.success("Funnel loaded successfully.");
        } catch (error) {
          toast.error(
            "Failed to parse the funnel file. Please check the format.",
          );
        }
      };
      reader.readAsText(file);
    },
    [setFunnel],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    maxFiles: 1,
  });

  useEffect(() => {
    if (autoOpenFileInput) {
      open();
      onOpenFileInputDialog();
    }
  }, [autoOpenFileInput, open, onOpenFileInputDialog]); // Empty dependency array to only run on mount

  return (
    <PhoneFrame>
      <div
        {...getRootProps()}
        className={`w-full h-full flex items-center transition-colors justify-center ${isDragActive ? "bg-sky-500/50" : "bg-white"}`}
      >
        <input {...getInputProps()} id="file-upload" />
        {/* icon */}
        <div className="text-center min-h-1/2 grid grid-cols-1 grid-rows-2 gap-4">
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
          {/* input  */}

          <div className="text-sm/6 ">
            {isDragActive ? (
              <p className="font-semibold text-white">Drop the file here.</p>
            ) : (
              <>
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white  text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 hover:text-sky-500"
                  onClick={(event) => event.stopPropagation()}
                >
                  <span className="font-semibold">
                    Upload a your funnel JSON file
                  </span>
                  <br />
                  <span className="text-gray-600">
                    or drag and drop it here.
                  </span>
                </label>
              </>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
