import { Link, useParams } from "react-router"
import { ArrowLeft, Download } from "lucide-react"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import BlurText from "~/components/react-bits/BlurText/BlurText"
import FadeContent from "~/components/react-bits/FadeContent/FadeContent"
import {
  AppleIcon,
  LinuxIcon,
  WindowsIcon,
} from "~/components/app/platform-icons"
import { getApp, type DownloadLinks } from "~/data/apps"

const PLATFORMS: {
  key: keyof DownloadLinks
  label: string
  icon: (props: { className?: string }) => React.ReactNode
}[] = [
  { key: "windows", label: "Windows", icon: WindowsIcon },
  { key: "mac", label: "macOS", icon: AppleIcon },
  { key: "linux", label: "Linux", icon: LinuxIcon },
]

export function meta({ params }: { params: { slug: string } }) {
  const app = getApp(params.slug)
  return [{ title: app ? `${app.name} @ inane.tools` : "Not found" }]
}

export default function AppPage() {
  const { slug } = useParams<{ slug: string }>()
  const app = slug ? getApp(slug) : undefined

  if (!app) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center px-4 pb-40 text-center">
        <p className="font-heading text-6xl font-extrabold">404</p>
        <p className="mt-2 text-muted-foreground">
          That tool doesn&apos;t exist (yet).
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Back to tools</Link>
        </Button>
      </main>
    )
  }

  const available = PLATFORMS.filter((p) => app.downloads[p.key])

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 pb-40">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="mt-6 w-fit text-muted-foreground"
      >
        <Link to="/">
          <ArrowLeft />
          All tools
        </Link>
      </Button>

      <header className="mt-8">
        <div className="flex items-center gap-4">
          <img
            src={app.icon}
            alt=""
            className="size-12 rounded-2xl border border-border shadow-sm sm:size-14"
          />
          <BlurText
            text={app.name}
            animateBy="letters"
            direction="top"
            delay={60}
            className="font-heading text-5xl font-extrabold tracking-tight sm:text-6xl"
          />
        </div>
        <FadeContent delay={120} duration={800}>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <p className="text-lg text-muted-foreground">{app.tagline}</p>
            {app.version && <Badge variant="outline">v{app.version}</Badge>}
          </div>
        </FadeContent>
      </header>

      <FadeContent blur delay={150} duration={800} className="mt-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10">
          <img
            src={app.screenshot}
            alt={`${app.name} screenshot`}
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
      </FadeContent>

      <FadeContent blur delay={200} duration={800}>
        <p className="mt-8 text-lg leading-relaxed font-medium">{app.blurb}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          {app.description}
        </p>
      </FadeContent>

      <FadeContent blur delay={250} duration={800}>
        <section className="mt-10">
          <h2 className="mb-4 font-heading text-xl font-bold">Download</h2>
          <div className="flex flex-wrap gap-3">
            {available.map((platform) => {
              const Icon = platform.icon
              return (
                <Button
                  key={platform.key}
                  asChild
                  size="lg"
                  className="gap-2.5 rounded-full px-6"
                >
                  <a
                    href={app.downloads[platform.key]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className="size-4" />
                    {platform.label}
                    <Download className="ml-1 size-4" />
                  </a>
                </Button>
              )
            })}
          </div>
        </section>
      </FadeContent>
    </main>
  )
}
