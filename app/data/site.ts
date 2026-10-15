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
    { label: "Board", href: "#board" },
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

  board: {
    name: "Board",
    version: "v1.0.0",
    releases: "https://github.com/inane-tools/board/releases/tag/v1.0.0",
    downloads: {
      windows:
        "https://github.com/inane-tools/board/releases/download/v1.0.0/Board_1.0.0_x64-setup.exe",
    },
    description:
      "A Windows app for freeform boards and journals. Collect your ideas, files and inspiration in one place.",
    screenshot: "/board-screenshot.webp",
    repo: "https://github.com/inane-tools/board",
    about: [
      "Arrange notes, tasks, images, GIFs, videos, links and nested boards on an infinite canvas, or write in a block editor.",
      "Built with Tauri v2 + Rust, Svelte 5, TypeScript and Tailwind v4. Board shares its interface and desktop shell with Cherry.",
    ],
    features: [
      {
        icon: "custom",
        title: "An open canvas",
        body: "Move and resize notes, tasks, media and files on a freeform board.",
      },
      {
        icon: "library",
        title: "Boards and journals",
        body: "Nest boards to organize your ideas, or write with headings, lists, tasks, quotes and code.",
      },
      {
        icon: "media",
        title: "Bring your files",
        body: "Drop files or folders onto the canvas. Paste or drag direct image, GIF and video links to import them locally.",
      },
      {
        icon: "link",
        title: "Tags and search",
        body: "Find content across your boards and organize it with shared, colored tags.",
      },
      {
        icon: "themes",
        title: "Make it yours",
        body: "Light and dark themes, custom accents, tinted surfaces and a movable toolbar.",
      },
      {
        icon: "keyboard",
        title: "Take things with you",
        body: "Copy text, images and files, or drag items out to other Windows apps.",
      },
    ] satisfies Feature[],
    faq: [
      {
        question: "What is Board?",
        answer:
          "A local-first space for collecting ideas and reference material, planning projects and keeping journals.",
      },
      {
        question: "Who is building Board?",
        answer:
          "inane.tools, with AI assistance from DeepSeek on the initial app and Codex on development, fixes and interface refinements.",
      },
      {
        question: "Which platforms are supported?",
        answer:
          "Board is being developed for Windows. Linux and macOS are not currently release targets.",
      },
      {
        question: "Does Board need an account?",
        answer:
          "No account is required. Boards and imported files stay on your machine. Link previews and remote media use the network; your notes are not synced to a server.",
      },
      {
        question: "Where can I download Board?",
        answer:
          "Use the Windows download button to get the NSIS setup installer from GitHub Releases. Board 1.0 is available for Windows.",
      },
    ] satisfies FAQ[],
  },

  cherry: {
    name: "Cherry",
    description:
      "A YouTube Music desktop client for Windows and Linux. Your music, my way.",

    about: [
      "Cherry is a YouTube Music desktop client, it features a completely custom frontend that speaks directly to YouTube Music's internal Innertube API, Cherry uses the same endpoints that the official YouTube Music Web app does.",
      "Built with Tauri v2 + Rust, Svelte 5, TypeScript and Tailwind v4.",
    ],
    version: "v1.6.0",
    disclaimer:
      "Cherry is an unofficial client and is not affiliated with, endorsed by, or associated with YouTube, Google or YouTube Music. All trademarks and content belong to their respective owners. To use Cherry, you need your own YouTube account. You are responsible for how you use it and for any consequences, including any effect on your account. The software is provided as is, without warranty of any kind.",

    repo: "https://github.com/inane-tools/cherry",
    releases: "https://github.com/inane-tools/cherry/releases/latest",
    downloads: {
      windows:
        "https://github.com/inane-tools/cherry/releases/download/v1.6.0/Cherry_1.6.0_x64-setup.exe",
      flatpak:
        "https://github.com/inane-tools/cherry/releases/download/v1.6.0/Cherry_1.6.0_x86_64.flatpak",
      appimage:
        "https://github.com/inane-tools/cherry/releases/download/v1.6.0/Cherry_1.6.0_amd64.AppImage",
    },

    features: [
      {
        icon: "custom",
        title: "Fully custom UI",
        body: "Not a wrapper on the YouTube Music web app - a fully custom interface built for simplicity and good looks.",
      },
      {
        icon: "sidebar",
        title: "A customizable sidebar",
        body: "Organise playlists in folders with artwork grids, pin favourites, and reorder pins within their group. Resize the sidebar or use compact icons; smaller windows use a drawer. Explore is available below Home.",
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
        body: "Create and edit playlists, change cover images, add or remove songs, choose a default save playlist, and save or unsave other playlists. Delete your own playlists with an explicit permanent-deletion confirmation.",
      },
      {
        icon: "queue",
        title: "Queue control",
        body: "Jump to any track, drag to reorder, remove tracks, or clear the queue. Keep it open in a right sidebar when there is room; smaller windows use the player queue button.",
      },
      {
        icon: "link",
        title: "Paste a link",
        body: "Drop a YouTube or YouTube Music song or playlist URL into the search box to open it.",
      },
      {
        icon: "media",
        title: "OS media integration",
        body: "OS media controls, hardware media keys, tray playback controls and pinned playlists. Windows taskbar shortcuts show pinned and recent playlists with artwork.",
      },
      {
        icon: "themes",
        title: "Light & dark themes",
        body: "Follow the system or choose light or dark. Use album-art or custom accents, optional tinted surfaces, and a soft two-colour backdrop. The window title follows the current track.",
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
          "Cherry is available for Windows and Linux (x86_64). Windows has a setup installer, and Linux has Flatpak and AppImage downloads. macOS is on the backburner for now.",
      },
      {
        question: "Where is my data stored?",
        answer:
          "Your session is kept in the Windows credential store or a Secret Service keyring on Linux. Settings and caches stay on your machine, and there is no telemetry.",
      },
    ] satisfies FAQ[],
  },
}
