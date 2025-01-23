import { unstable_cache } from "next/cache";
import { turso, type fave } from "@/lib/turso";
import { Grid } from "@/components/grid";
import { Item } from "@/components/item";

const getCachedResults = unstable_cache(
  async () => {
    const { rows } = await turso.execute(
      "SELECT * FROM favourites ORDER BY url ASC",
    );
    return rows;
  },
  ["faves"],
  {
    tags: ["faves"],
  },
);

export default async function Home() {
  const rows = await getCachedResults();
  // @ts-expect-error cba to sort right now
  const faves: fave[] = rows;

  return (
    <Grid>
      {faves.map((row) => (
        <Item key={row.id} item={row} />
      ))}
    </Grid>
  );
}
