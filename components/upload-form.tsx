"use client";

import React, { useState, useActionState, useEffect } from "react";
import Form from "next/form";
import { upload } from "../app/actions";
import { useRouter } from "next/navigation";

export interface UploadFormData {
  image: File;
  width: string;
  height: string;
  tags: string;
  source: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  redirectUrl?: string;
  errors?: {
    [K in keyof UploadFormData]?: string[];
  };
}

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export const UploadForm = () => {
  const [state, action, isPending] = useActionState(upload, initialState);
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    setDimensions({ width: target.naturalWidth, height: target.naturalHeight });
  };

  console.log(state);

  useEffect(() => {
    if (state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  return (
    <div className="flex gap-6 mt-6 items-start">
      <Form
        action={action}
        className="flex flex-col items-start gap-6 max-w-sm w-full bg-neutral-100 p-4 rounded"
      >
        <fieldset className="flex flex-col gap-px w-full">
          <label htmlFor="image" className="sr-only">
            Select an image:
          </label>
          <input type="file" id="image" name="image" onChange={onImageChange} />
          {dimensions.width !== 0 && (
            <p className="text-sm text-neutral-500">
              Dimensions: {dimensions.width}x{dimensions.height}px
            </p>
          )}
        </fieldset>
        <input type="hidden" name="width" value={dimensions.width} />
        <input type="hidden" name="height" value={dimensions.height} />
        <fieldset className="flex flex-col gap-px w-full">
          <label className="text-sm" htmlFor="tags">
            Tags
            {state?.errors?.tags && (
              <p className="text-sm text-red-500">{state.errors.tags[0]}</p>
            )}
          </label>
          <input
            className="border p-2 rounded-sm"
            type="text"
            name="tags"
            placeholder="tags"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-px">
          <label className="text-sm" htmlFor="source">
            Source
            {state?.errors?.source && (
              <p className="text-sm text-red-500">{state.errors.source[0]}</p>
            )}
          </label>
          <input
            className="border p-2 rounded-sm"
            type="text"
            name="source"
            placeholder="source"
          />
        </fieldset>

        <button
          type="submit"
          disabled={isPending}
          className="px-4 h-12 pb-px bg-emerald-500 dark:bg-emerald-800 text-white hover:bg-emerald-700 focus:bg-emerald-700 transition-colors flex items-center leading-none rounded"
        >
          {isPending ? "Uploading..." : "Add now"}
        </button>
      </Form>
      {image && (
        <div className="w-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img onLoad={onImageLoad} alt="preview image" src={image} />
        </div>
      )}
    </div>
  );
};
