# Bukk.it faves

I love [bukk.it](https://bukk.it) but I always forget the filenames of my faves, so I’ve made this to store my faves with extra tags.

I can add new faves from the command line using [Turso’s CLI](https://docs.turso.tech/cli/db/shell):

```sh
  ❯ turso db shell bukkit "INSERT INTO favourites (created_at, url, author, tags) VALUES (datetime('now'), 'theandies.gif', 'Jon Heslop', 'hot fuzz');"
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
