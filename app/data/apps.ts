export type DownloadLinks = {
  windows?: string
  mac?: string
  linux?: string
}

export type App = {
  slug: string
  name: string
  tagline: string
  blurb: string
  description: string
  screenshot: string
  cover: string
  icon: string
  downloads: DownloadLinks
  version?: string
}

export const apps: App[] = [
  {
    slug: "dither",
    name: "dither",
    tagline: "A canvas that matches your energy",
    blurb:
      "A semi-simple app for applying dithering, and some other effects to images.",
    description:
      "I could not afford a certain other dithering app, so I had deepseek build one for me. Ain't the future grand?",
    screenshot: "/screenshots/vibepad.svg",
    cover: "/covers/dither.png",
    icon: "/icons/vibepad.svg",
    downloads: {
      windows: "https://example.com/downloads/vibepad/windows",
      mac: "https://example.com/downloads/vibepad/mac",
      linux: "https://example.com/downloads/vibepad/linux",
    },
    version: "1.2.0",
  },
  {
    slug: "noted",
    name: "noted",
    tagline: "Ohh man, I mean the world needs another note-taking app, right?",
    blurb:
      "A simple note-taking app with a focus on gobbling up ram and being a bit of a resource hog.",
    description:
      "Drop in an audio file and Glitch instantly re-slices it into something new. Stutter, reverse, crush and scramble in real time — export the result as WAV or MP3 in one click.",
    screenshot: "/screenshots/glitch.svg",
    cover: "/covers/noted.png",
    icon: "/icons/noted.svg",
    downloads: {
      windows: "https://example.com/downloads/glitch/windows",
      mac: "https://example.com/downloads/glitch/mac",
    },
    version: "0.9.4",
  },
  {
    slug: "shinonome",
    name: "shinonome",
    tagline: "The ONLY discord bot that has a built-in Chinese Slot Machine.",
    blurb:
      "Tools for a very specific kind of niche, Hoyoverse banner checker and a Chinese slot machine.",
    description:
      "MiniGraph connects to Postgres, MySQL or SQLite and builds an explorable graph from your schema and sample queries. Great for poking around a new database and sharing findings fast.",
    screenshot: "/screenshots/minigraph.svg",
    cover: "/covers/shinonome.png",
    icon: "/icons/minigraph.svg",
    downloads: {
      mac: "https://example.com/downloads/minigraph/mac",
      linux: "https://example.com/downloads/minigraph/linux",
    },
    version: "2.1.3",
  },
]

export function getApp(slug: string): App | undefined {
  return apps.find((app) => app.slug === slug)
}
