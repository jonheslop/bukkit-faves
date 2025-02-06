import { fave } from "@/lib/turso";
import Image from "next/image";
import Link from "next/link";

export const Info = ({ item }: { item: fave }) => {
  const tags = item.tags.split(", ");
  return (
    <div className="flex flex-col lg:grid grid-cols-3 gap-4 mt-8 lg:mt-16">
      <Link target="_blank" href={`https://gif.land/${item.url}`}>
        <Image
          src={`https://gif.land/${item.url}`}
          width={500}
          height={500}
          alt={item.url}
          unoptimized={item.url.includes(".gif")}
        />
      </Link>
      <article className="-mt-2">
        <h1 className="leading-tight text-3xl mb-8">
          <Link
            className="underline underline-offset-2 hover:text-emerald-700 hover:dark:text-emerald-500"
            target="_blank"
            href={`https://gif.land/${item.url}`}
          >
            {item.url}
          </Link>
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
          Tags:{" "}
          {tags.map((tag, index) => (
            <Link
              href={`/search/${encodeURI(tag)}`}
              key={index}
              className="hover:underline"
            >
              {tag}
              {index < tags.length - 1 ? ", " : ""}
            </Link>
          ))}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
          Posted by:{" "}
          <Link href={`#`} className="hover:underline">
            {item.author}
          </Link>
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
          Source:{" "}
          <Link href={`#`} className="hover:underline">
            {item.Source}
          </Link>
        </p>
      </article>
    </div>
  );
};
