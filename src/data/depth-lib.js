import { clause } from "./shape.js";

export function add(url, items) {
  return items.map(([title, tags, score, plain, pointer, implications, courts]) =>
    clause({
      title,
      tags,
      score,
      plain,
      pointer,
      sourceUrl: url,
      implications,
      courts,
    })
  );
}
