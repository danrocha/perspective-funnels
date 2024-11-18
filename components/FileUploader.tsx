"use client";
import { useCallback, useContext, useState } from "react";
import { FunnelContext } from "@/lib/contexts";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import PhoneFrame from "./PhoneFrame";

export function FileUploader() {
  const [fileName, setFileName] = useState("");
  const [funnel, setFunnel] = useContext(FunnelContext);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setFileName(file.name);

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
    [setFunnel, setFileName],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    maxFiles: 1,
  });

  return (
    <PhoneFrame>
      <div
        {...getRootProps()}
        className={`w-full h-full flex items-center transition-colors justify-center ${isDragActive ? "bg-indigo-500/50" : "bg-white"}`}
      >
        <input {...getInputProps()} id="file-upload" />
        {/* icon */}
        <div className="text-center min-h-1/2 grid grid-cols-1 grid-rows-2">
          <svg
            className={`mx-auto size-12  ${isDragActive ? "text-white" : "text-indigo-500/50"}`}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clipRule="evenodd"
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
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  onClick={(event) => event.stopPropagation()}
                >
                  <span>Upload a your funnel JSON file</span>
                </label>
                <p className="text-gray-600">or drag and drop it here.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
