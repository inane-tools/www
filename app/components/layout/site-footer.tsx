import { GitHubIcon } from "~/components/icons/github-icon"
import { XIcon } from "~/components/icons/x-icon"
import { site } from "~/data/site"

const SOCIAL =
  "inline-flex size-9 items-center justify-center rounded-lg border border-border/70 bg-card/40 text-foreground backdrop-blur-md transition-colors hover:bg-card/70"

export function SiteFooter() {
  return (
    <footer
      id="about"
      className="relative mt-24 scroll-mt-24 border-t border-border/70"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <div className="max-w-xl">
          <img src="/inane.svg" alt="inane" className="h-8 w-auto" />

          <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
            [ {site.about.body} ]
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={site.maker.x}
              target="_blank"
              rel="noreferrer"
              aria-label="inane on X"
              className={SOCIAL}
            >
              <XIcon className="size-4" />
            </a>
            <a
              href={site.maker.href}
              target="_blank"
              rel="noreferrer"
              aria-label="inane on GitHub"
              className={SOCIAL}
            >
              <GitHubIcon className="size-4" />
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
          © {new Date().getFullYear()} {site.maker.name}. Cherry is an
          unofficial client and is not affiliated with YouTube or Google.
        </p>
      </div>
    </footer>
  )
}
