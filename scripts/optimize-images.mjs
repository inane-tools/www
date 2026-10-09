// Converts a source image dropped in public/ into the .webp version the site
// serves, then removes the source. `public/icons/cherry.png` is kept as the
// source for the icon.
//
//   npm run images
//
// So the workflow is: drop a new source image at one of the input paths below,
// run this, and it is replaced with a .webp. It is a no-op when a source is
// already gone.

import { stat, rm } from "node:fs/promises"
import { existsSync } from "node:fs"
import sharp from "sharp"

const jobs = [
  { in: "public/screenshot.png", out: "public/screenshot.webp" },
  {
    in: "public/screenshot-compact.png",
    out: "public/screenshot-compact.webp",
  },
  {
    in: "public/icons/cherry.png",
    out: "public/icons/cherry.webp",
    keep: true,
  },
]

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`

for (const job of jobs) {
  if (!existsSync(job.in)) continue
  const before = (await stat(job.in)).size
  await sharp(job.in).webp({ quality: 82, effort: 6 }).toFile(job.out)
  const after = (await stat(job.out)).size
  if (!job.keep) await rm(job.in, { force: true })
  console.log(
    `${job.in} -> ${job.out}  ${kb(before)} -> ${kb(after)}${job.keep ? " (kept source)" : ""}`
  )
}
