import { turso, type fave } from "@/lib/turso";
import { Info } from "@/components/info";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { rows } = await turso.execute(
    `SELECT * FROM favourites WHERE URL = "${slug}"`,
  );
  const faves = rows as fave[];

  const item = faves[0];

  if (!item) {
    return <div>Not found</div>;
  }

  return <Info item={item} />;
}
