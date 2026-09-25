import { useLocation, useNavigate } from "react-router"
import { Sparkles } from "lucide-react"

import { site } from "~/data/site"
import { ThemeToggle } from "~/components/layout/theme-toggle"

const SECTIONS = [
  { id: "apps", label: "Apps" },
  { id: "faq", label: "Q&A" },
  { id: "info", label: "Info" },
] as const

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  function goToSection(id: string) {
    if (location.pathname !== "/") {
      navigate("/")
      // wait for the home route to render before scrolling
      window.setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 80)
      return
    }
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center pt-2 pb-[max(env(safe-area-inset-bottom),1rem)]">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border bg-background/80 px-2 py-1.5 shadow-lg shadow-black/5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-bold tracking-tight transition-colors hover:bg-muted"
          aria-label={`${site.name} home`}
        >
          <Sparkles className="size-4" />
          <span className="hidden sm:inline">{site.name}</span>
        </button>

        <span className="mx-1 h-5 w-px bg-border" aria-hidden />

        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => goToSection(section.id)}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {section.label}
          </button>
        ))}

        <span className="mx-1 h-5 w-px bg-border" aria-hidden />

        <ThemeToggle />
      </div>
    </nav>
  )
}
