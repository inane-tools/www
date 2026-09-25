export type FAQ = {
  question: string
  answer: string
}

export type SiteLink = {
  label: string
  href: string
}

export const site = {
  name: "inane.tools",
  tagline: "Vibe-coded tools for humans and machines.",
  about:
    "software made for my convenience, oh uh i mean uhm----- We are a New and Innovative Software House based in the Silicon Valley of Finland, Here at inane.tools We are building High-Tech solutions with Cutting Edge Technologies to provide our Shareholders with the most Yacht Money Possible.",
  links: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "X", href: "https://x.com/" },
  ] satisfies SiteLink[],
  faq: [
    {
      question: "What does vibe-coded mean?",
      answer:
        "It means we lean on AI-assisted development to move fast — sketching, testing and shipping ideas in hours instead of weeks. Every tool still gets a human review before it goes out.",
    },
    {
      question: "Are the tools free?",
      answer:
        "Yes. Everything on this site is free to download and use. If something ever becomes paid, we'll keep a generous free tier and say so clearly on its page.",
    },
    {
      question: "Do I need an account?",
      answer:
        "No. None of our tools require an account, sign-in or phone-home telemetry. Your data stays on your machine.",
    },
    {
      question: "Which platforms are supported?",
      answer:
        "Each tool has its own page with download links for the platforms it supports — Windows, macOS and Linux. Check the individual page for the exact list.",
    },
    {
      question: "How do I report a bug or request a feature?",
      answer:
        "Open an issue on the tool's GitHub repository, or send us an email. We read everything and usually respond within a couple of days.",
    },
  ] satisfies FAQ[],
}
