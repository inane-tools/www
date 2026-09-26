import { Download } from "lucide-react"

import { GitHubIcon } from "~/components/icons/github-icon"
import { XIcon } from "~/components/icons/x-icon"
import { Button } from "~/components/ui/button"
import { site } from "~/data/site"

const ACTION =
  "rounded-lg border border-white/10 bg-[linear-gradient(180deg,#1e1e22,#0b0b0d)] text-white backdrop-blur-md hover:border-white/20 hover:bg-[linear-gradient(180deg,#26262b,#111114)]"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-5 px-5">
        <a
          href="#top"
          aria-label={`${site.name} home`}
          className="flex items-center gap-2"
        >
          <img src="/icons/cherry.png" alt="" className="h-7 w-auto" />
          <span className="font-heading text-lg leading-none font-bold tracking-tight [font-stretch:115%]">
            {site.name}
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-[0.825rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={`h-7 px-3 ${ACTION}`}
          >
            <a href={site.releases} target="_blank" rel="noreferrer">
              <Download />
              Download
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon-sm" className={ACTION}>
            <a
              href={site.maker.x}
              target="_blank"
              rel="noreferrer"
              aria-label="Cherry on X"
            >
              <XIcon className="size-3.5" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon-sm" className={ACTION}>
            <a
              href={site.repo}
              target="_blank"
              rel="noreferrer"
              aria-label="Cherry on GitHub"
            >
              <GitHubIcon className="size-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
