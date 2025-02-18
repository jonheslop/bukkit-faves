import { UploadForm } from "../../components/upload-form";

export default async function AddNew() {
  return (
    <>
      <h1 className="leading-tight text-3xl">Upload a file</h1>
      <p className="text-neutral-500">
        Optimise your images for faster loading times.
      </p>
      <UploadForm />
    </>
  );
}
