import type { ReactNode } from "react"

import { GitHubIcon } from "~/components/icons/github-icon"
import { XIcon } from "~/components/icons/x-icon"
import { site } from "~/data/site"

const DOT = "size-1.5 rounded-full bg-current"

const NAV_ICONS: Record<string, ReactNode> = {
  "#cherry": (
    <img src="/icons/cherry.webp" alt="" className="size-5 object-contain" />
  ),
  "#board": (
    <img src="/icons/board.webp" alt="" className="size-5 object-contain" />
  ),
  "#apps": <span className={DOT} />,
  "#about": <span className={DOT} />,
}

const ICON_LINK =
  "flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"

export function SiteSidebar() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-12 flex-col items-center justify-between border-r border-border p-2 md:flex">
        <a
          href="#top"
          aria-label={`${site.name} home`}
          className="flex h-auto w-12 items-center justify-center"
        >
          <img src="/inane.svg" alt="" className="h-16 rotate-90" />
        </a>

        <nav className="flex flex-col items-center gap-1">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className={ICON_LINK}
            >
              {NAV_ICONS[item.href] ?? <span className={DOT} />}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-1">
          <a
            href={site.maker.x}
            target="_blank"
            rel="noreferrer"
            aria-label="inane on X"
            className={ICON_LINK}
          >
            <XIcon className="size-4" />
          </a>
          <a
            href={site.maker.href}
            target="_blank"
            rel="noreferrer"
            aria-label="inane on GitHub"
            className={ICON_LINK}
          >
            <GitHubIcon className="size-4" />
          </a>
        </div>
      </aside>

      <header className="fixed inset-x-0 bottom-0 z-50 flex h-14 items-center justify-between border-t border-border bg-background px-5 md:hidden">
        <a href="#top" aria-label={`${site.name} home`}>
          <img src="/inane.svg" alt="" className="h-5 w-auto" />
        </a>
        <nav className="flex items-center gap-1">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={ICON_LINK}
            >
              {NAV_ICONS[item.href] ?? <span className={DOT} />}
            </a>
          ))}
        </nav>
      </header>
    </>
  )
}
