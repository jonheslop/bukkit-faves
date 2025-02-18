"use server";

import { cookies } from "next/headers";
import { turso } from "@/lib/turso";
import type { UploadFormData, ActionResponse } from "../components/upload-form";
import { z } from "zod";

export async function createZoomedCookie() {
  (await cookies()).set("zoomed", "true");
}

export async function deleteZoomedCookie() {
  (await cookies()).delete("zoomed");
}

const schema = z.object({
  image: z.instanceof(File),
  width: z.string().min(1).max(2000),
  height: z.string().min(1).max(2000),
  tags: z.string().min(1).max(255),
  source: z.string().min(1).max(255),
});

export async function upload(
  prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const rawData: UploadFormData = {
      image: formData.get("image") as File,
      width: formData.get("width") as string,
      height: formData.get("height") as string,
      tags: formData.get("tags") as string,
      source: formData.get("source") as string,
    };

    const validatedData = schema.safeParse(rawData);

    if (!validatedData.success) {
      console.error(validatedData);
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }
    const cloudflare = await fetch(
      `https://worker.albion-dev.workers.dev/${validatedData.data.image.name}`,
      {
        method: "PUT",
        body: validatedData.data.image,
        headers: {
          "X-Custom-Auth-Key": process.env.CF_WORKER_API_TOKEN || "",
        },
      },
    );

    if (!cloudflare.ok) {
      throw new Error("Failed to upload file to Cloudflare R2");
    }

    const result = await turso.execute(
      `INSERT INTO favourites (created_at, url, author, tags, source, width, height) VALUES (datetime('now'), '${validatedData.data.image.name}', 'Jon Heslop', '${validatedData.data.tags}', '${validatedData.data.source}', ${validatedData.data.width}, ${validatedData.data.height});`,
    );

    if (result.rowsAffected !== 1) {
      throw new Error("Failed to add meta to Turso DB");
    }

    return {
      success: true,
      message: "Image uploaded successfully",
      redirectUrl: `/info/${validatedData.data.image.name}`,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred while processing the request",
    };
  }
}
