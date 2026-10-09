export type FAQ = {
  question: string
  answer: string
}

export type Feature = {
  icon:
    | "custom"
    | "sidebar"
    | "player"
    | "signin"
    | "library"
    | "queue"
    | "link"
    | "media"
    | "themes"
    | "keyboard"
    | "sleep"
    | "integrations"
  title: string
  body: string
}

export type Project = {
  id: string
  name: string
  tagline: string
  description: string
  icon: string
  repo: string
  href: string
}

export const site = {
  name: "inane",
  domain: "inane.tools",
  description:
    "inane is a one-person software outfit. Every project is built with DeepSeek and exists to fill a particular need.",

  url: "https://inane.tools",
  ogImage: "/og-inane.jpg",

  maker: {
    name: "inane",
    href: "https://github.com/inane-tools",
    x: "https://x.com/inanetools",
  },

  nav: [
    { label: "Cherry", href: "#cherry" },
    { label: "About", href: "#about" },
  ] satisfies { label: string; href: string }[],

  about: {
    body: "inane tools built to fit a specific need, want or just from frustration with other tools - inane tools built by ai, with instructions from a person - inane.tools",
  },

  projects: [
    {
      id: "cherry",
      name: "Cherry",
      tagline: "Your music, my way",
      description:
        "A simple YouTube Music desktop app with a nice user experience, less features, but nicer for actual listening.",
      icon: "/icons/cherry.webp",
      repo: "https://github.com/inane-tools/cherry",
      href: "#cherry",
    },
  ] satisfies Project[],

  cherry: {
    name: "Cherry",
    description:
      "A YouTube Music desktop client that is not just another wrapper. Your music, my way.",

    about: [
      "Cherry is a YouTube Music desktop client that is not just another wrapper, it has a completely custom frontend, that speaks directly to YouTube Music's internal Innertube API (via youtubei.js)",
      "Since there is no official API, it uses the same endpoints that the Web Player does. Built with Tauri v2 + Rust, Svelte 5, TypeScript and Tailwind v4.",
    ],
    version: "v1.3.0",
    disclaimer:
      "Cherry is an unofficial client and is not affiliated with, endorsed by, or associated with YouTube, Google or YouTube Music. All trademarks and content belong to their respective owners. To use Cherry, you need your own YouTube account. You are responsible for how you use it and for any consequences, including any effect on your account. The software is provided as is, without warranty of any kind.",

    repo: "https://github.com/inane-tools/cherry",
    releases: "https://github.com/inane-tools/cherry/releases/latest",

    features: [
      {
        icon: "custom",
        title: "Fully custom UI",
        body: "Not a wrapper on the YouTube Music web app - a fully custom interface built for simplicity and good looks.",
      },
      {
        icon: "sidebar",
        title: "A customizable sidebar",
        body: "One user-organised list of playlists and folders. Drag to reorder, drop a playlist onto a folder, pin favourites, resize it, or switch to a compact icon-only mode. Collapses into a drawer below ~820px.",
      },
      {
        icon: "player",
        title: "Full-screen player",
        body: "Click the album art to open the full-screen music view.",
      },
      {
        icon: "signin",
        title: "In-app sign in",
        body: "Loads music.youtube.com and keeps the session in the OS keychain, never localStorage. Handles multiple brand accounts, switchable in Settings.",
      },
      {
        icon: "library",
        title: "Edit your library",
        body: "Create playlists, add or remove songs, rename, edit descriptions, set cover images, pick a default save playlist, and save or unsave playlists you didn't create. Still a work in progress.",
      },
      {
        icon: "queue",
        title: "Queue control",
        body: "Jump to any track (dropping the ones before it), drag-reorder, remove tracks, and clear.",
      },
      {
        icon: "link",
        title: "Paste a link",
        body: "Drop a YouTube or YouTube Music song or playlist URL into the search box to open it.",
      },
      {
        icon: "media",
        title: "OS media integration",
        body: "SMTC, MPRIS and Now Playing, taskbar preview buttons, hardware media keys, and album-art-driven theming.",
      },
      {
        icon: "themes",
        title: "Light & dark themes",
        body: "Follow the system or pick one, with the accent taken from the album art or a custom colour, plus optional background gradients. The window title follows the current track.",
      },
      {
        icon: "keyboard",
        title: "Keyboard shortcuts",
        body: "Space to play/pause, arrows to seek, Ctrl+arrows to skip and change volume, S/R for shuffle/repeat, Ctrl+F to search (full list in Settings).",
      },
      {
        icon: "sleep",
        title: "Sleep timer",
        body: "Stop after 5 minutes to 1.5 hours with a gentle fade, or at the end of the current track.",
      },
      {
        icon: "integrations",
        title: "Integrations",
        body: "Show what you're playing as a Discord activity, and scrobble songs to Last.fm.",
      },
    ] satisfies Feature[],

    faq: [
      {
        question: "Why does Cherry exist?",
        answer:
          "Cherry was made because I think that the current YouTube Music player app is offensively bad. The catalogue of songs on YouTube is unparalleled but the app is so bad that I personally do not want to use it purely for that reason.",
      },
      {
        question: "Who built Cherry?",
        answer:
          "Cherry was built by DeepSeek V4.1 Flash, an AI model, working from my ideas and feedback. From the player to the interface, the whole thing was vibe-coded, though I made the icon myself in Figma.",
      },
      {
        question: "Is Cherry affiliated with YouTube or Google?",
        answer:
          "No. It's an unofficial client and isn't endorsed by or affiliated with YouTube or Google.",
      },
      {
        question: "Is Cherry free?",
        answer:
          "Yes. It's a personal project. Grab it from GitHub and use it however you like.",
      },
      {
        question: "Do I need a YouTube Music account?",
        answer:
          "Technically no. Cherry can play without an account, but I've gated playback behind sign-in for now, so you'll need to sign in to use it.",
      },
      {
        question: "Which platforms are supported?",
        answer:
          "Cherry is currently Windows only, but I might make it available on mac and linux too depending on if I feel like it.",
      },
      {
        question: "Where is my data stored?",
        answer:
          "Your session is kept in the Windows credential store, settings stay on your machine, and there is no telemetry.",
      },
    ] satisfies FAQ[],
  },
}
