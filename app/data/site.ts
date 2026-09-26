export type FAQ = {
  question: string
  answer: string
}

export type Feature = {
  icon: "discord" | "palette" | "custom" | "pin"
  title: string
  body: string
}

export const site = {
  name: "Cherry",
  tagline: "Your music, my way",
  description:
    "A simple YouTube Music desktop app with a nice user experience, less features, but nicer for actual listening.",
  intro:
    "A simple YouTube Music desktop app with a nice user experience, less features, but nicer for actual listening.",

  repo: "https://github.com/inane-tools/cherry",
  releases: "https://github.com/inane-tools/cherry/releases/latest",
  maker: {
    name: "inane.tools",
    href: "https://github.com/inane-tools",
    x: "https://x.com/inanetools",
  },

  nav: [
    { label: "FAQ", href: "#faq" },
    { label: "Features", href: "#features" },
  ] satisfies { label: string; href: string }[],

  features: [
    {
      icon: "discord",
      title: "Discord Rich Presence",
      body: "Whatever you're playing shows on your Discord profile, album art and all, with a live progress bar.",
    },
    {
      icon: "palette",
      title: "A UI that follows the album art",
      body: "Cherry pulls its highlight colour from the cover of the current song, so the whole interface shifts with the music.",
    },
    {
      icon: "custom",
      title: "A real frontend, not a wrapper",
      body: "Cherry doesn't wrap the YouTube Music web player. It's a completely custom frontend talking straight to YouTube Music.",
    },
    {
      icon: "pin",
      title: "Pin your favorite playlists",
      body: "Keep the playlists you use most pinned to the top of the window, so they're always one click away.",
    },
  ] satisfies Feature[],

  about: {
    body: "inane is a one-person software outfit. transparency matters here: every project is built with deepseek, and every one exists to fill a particular need.",
  },

  highlight: {
    title: "falling metal pipe sound effect 10 hours",
    artist: "downloadfreesoundeffects",
    image: "/metal_pipe.jpg",
  },

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
}
