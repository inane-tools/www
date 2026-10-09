import { GitHubIcon } from "~/components/icons/github-icon"
import { XIcon } from "~/components/icons/x-icon"
import { site } from "~/data/site"

const TILE =
  "group flex size-20 items-center justify-center rounded-lg bg-white text-black transition-colors hover:bg-zinc-200"

// Kept out of the page while Cherry is the only app. Re-add
// `<AppsSection />` to home.tsx (and the "Apps" nav item) once there's more.
export function AppsSection() {
  return (
    <section
      id="apps"
      className="flex min-h-svh snap-start snap-always items-center border-b border-border/70 px-6 md:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap gap-4">
          {site.projects.map((project) => (
            <a
              key={project.id}
              href={project.href}
              aria-label={project.name}
              className={TILE}
            >
              <img
                src={project.icon}
                alt=""
                width={773}
                height={691}
                className="h-12 w-auto object-contain"
              />
            </a>
          ))}

          <a
            href={site.maker.href}
            target="_blank"
            rel="noreferrer"
            aria-label="inane on GitHub"
            className={TILE}
          >
            <GitHubIcon className="size-10" />
          </a>

          <a
            href={site.maker.x}
            target="_blank"
            rel="noreferrer"
            aria-label="inane on X"
            className={TILE}
          >
            <XIcon className="size-10" />
          </a>
        </div>
      </div>
    </section>
  )
}
