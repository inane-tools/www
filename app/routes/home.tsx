import type { ComponentType } from "react"
import { AppWindow, Download, ListMusic, Palette, Pin } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"
import { DiscordIcon } from "~/components/icons/discord-icon"
import { LastfmIcon } from "~/components/icons/lastfm-icon"
import { HeroDither } from "~/components/layout/hero-dither"
import { GitHubIcon } from "~/components/icons/github-icon"
import { SiteFooter } from "~/components/layout/site-footer"
import { SiteHeader } from "~/components/layout/site-header"
import FadeContent from "~/components/react-bits/FadeContent/FadeContent"
import { site, type Feature } from "~/data/site"
import type { Route } from "./+types/home"

const FEATURE_ICONS: Record<
  Feature["icon"],
  ComponentType<{ className?: string }>
> = {
  discord: DiscordIcon,
  palette: Palette,
  custom: AppWindow,
  pin: Pin,
  scrobble: LastfmIcon,
  playlist: ListMusic,
}

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Windows",
  description: site.description,
  url: site.url,
  image: `${site.url}${site.ogImage}`,
  downloadUrl: site.releases,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: {
    "@type": "Organization",
    name: site.maker.name,
    url: site.maker.href,
  },
})

export function meta() {
  const title = `${site.name} · ${site.tagline}`
  const image = `${site.url}${site.ogImage}`
  const alt = `${site.name} · ${site.tagline}`
  return [
    { title },
    { name: "description", content: site.description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: title },
    { property: "og:description", content: site.description },
    { property: "og:url", content: site.url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: alt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@inanetools" },
    { name: "twitter:creator", content: "@inanetools" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: site.description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: alt },
  ]
}

export const links: Route.LinksFunction = () => [
  { rel: "canonical", href: site.url },
]

export default function Home() {
  return (
    <div className="relative min-h-svh overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <SiteHeader />

      <main>
        {/* Hero */}
        <section
          id="top"
          className="relative -mt-16 flex min-h-svh flex-col overflow-hidden"
        >
          <HeroDither />

          <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pt-24 pb-20 text-center">
            <FadeContent blur duration={900} className="w-full">
              <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[8px] border border-border/70 shadow-2xl shadow-black/50">
                <img
                  src="/screenshot.png"
                  alt="The Cherry app playing a track"
                  className="w-full"
                />
              </div>
            </FadeContent>

            <FadeContent blur delay={150} duration={900} className="mt-10">
              <h1 className="mx-auto max-w-3xl text-5xl leading-[1.02] tracking-tight text-balance sm:text-6xl">
                {site.tagline}
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
                {site.intro}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="pointer-events-auto h-11 rounded-lg border border-white/15 bg-[linear-gradient(180deg,#ff6b7a,#e0344a)] px-6 text-[0.95rem] text-white shadow-lg shadow-primary/25 hover:brightness-110"
                >
                  <a href={site.releases} target="_blank" rel="noreferrer">
                    <Download />
                    Download for Windows
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="pointer-events-auto h-11 rounded-lg border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))] px-6 text-[0.95rem] backdrop-blur-md hover:border-border hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.15),rgba(255,255,255,0.04))]"
                >
                  <a href={site.repo} target="_blank" rel="noreferrer">
                    <GitHubIcon className="size-4" />
                    View source
                  </a>
                </Button>
              </div>
            </FadeContent>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="mx-auto w-full max-w-3xl scroll-mt-24 px-5 pt-24"
        >
          <FadeContent blur duration={800}>
            <h2 className="text-3xl tracking-tight text-balance sm:text-4xl">
              What, Why, Who?
            </h2>
          </FadeContent>

          <FadeContent blur delay={150} duration={800} className="mt-8">
            <Accordion type="single" collapsible className="w-full">
              {site.faq.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="py-4 text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="h-auto text-[0.95rem] leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeContent>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto w-full max-w-3xl scroll-mt-24 px-5 pt-24"
        >
          <FadeContent blur duration={800}>
            <h2 className="text-3xl tracking-tight text-balance sm:text-4xl">
              Features
            </h2>
          </FadeContent>

          <div className="mt-8 flex flex-col gap-4">
            {site.features.map((feature, i) => {
              const Icon = FEATURE_ICONS[feature.icon]
              return (
                <FadeContent
                  key={feature.title}
                  blur
                  delay={i * 80}
                  duration={800}
                >
                  <div className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-xl">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {feature.body}
                      </p>
                    </div>
                  </div>
                </FadeContent>
              )
            })}
          </div>
        </section>

        {/* Closing */}
        <section className="mx-auto w-full max-w-3xl px-5 pt-24">
          <FadeContent blur duration={800}>
            <div className="cherry-card relative overflow-hidden rounded-3xl border border-border/70 px-8 py-14 text-center sm:px-12">
              <div className="flex flex-col items-center gap-6">
                <img src="/icons/cherry.png" alt="" className="h-12 w-auto" />
                <h2 className="text-3xl tracking-tight text-balance sm:text-4xl">
                  Check it out
                </h2>
                <p className="max-w-sm text-pretty text-muted-foreground">
                  The source is on GitHub. Windows-only for now.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-11 rounded-lg border border-white/15 bg-[linear-gradient(180deg,#ff6b7a,#e0344a)] px-6 text-[0.95rem] text-white shadow-lg shadow-primary/25 hover:brightness-110"
                  >
                    <a href={site.releases} target="_blank" rel="noreferrer">
                      <Download />
                      Download
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-lg border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))] px-6 text-[0.95rem] backdrop-blur-md hover:border-border hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.15),rgba(255,255,255,0.04))]"
                  >
                    <a href={site.repo} target="_blank" rel="noreferrer">
                      <GitHubIcon className="size-4" />
                      View source
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </FadeContent>
        </section>

        {/* Highlight */}
        <section className="mx-auto w-full max-w-3xl px-5 pt-12">
          <FadeContent blur duration={800}>
            <div className="cherry-playerbar mx-auto flex w-full max-w-md items-center gap-3 rounded-xl border border-border/70 p-3 text-left backdrop-blur-md">
              <img
                src={site.highlight.image}
                alt=""
                className="size-14 shrink-0 rounded-lg object-cover ring-1 ring-white/10"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {site.highlight.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {site.highlight.artist}
                </p>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-1/3 rounded-full bg-[linear-gradient(90deg,#ff6b7a,#ff8a5c)]" />
                </div>
              </div>
            </div>
          </FadeContent>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
