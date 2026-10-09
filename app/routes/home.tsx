import type { ComponentType } from "react"
import {
  BiAlarm,
  BiDesktop,
  BiEdit,
  BiFullscreen,
  BiLink,
  BiListUl,
  BiLogIn,
  BiPalette,
  BiPlug,
  BiSidebar,
  BiSolidKeyboard,
  BiWindowAlt,
} from "react-icons/bi"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { GitHubIcon } from "~/components/icons/github-icon"
import { XIcon } from "~/components/icons/x-icon"
import { SiteSidebar } from "~/components/layout/site-sidebar"
import { DitherBackdrop } from "~/components/layout/dither-backdrop"
import { site, type Feature } from "~/data/site"
import type { Route } from "./+types/home"

const FEATURE_ICONS: Record<
  Feature["icon"],
  ComponentType<{ className?: string }>
> = {
  custom: BiWindowAlt,
  sidebar: BiSidebar,
  player: BiFullscreen,
  signin: BiLogIn,
  library: BiEdit,
  queue: BiListUl,
  link: BiLink,
  media: BiDesktop,
  themes: BiPalette,
  keyboard: BiSolidKeyboard,
  sleep: BiAlarm,
  integrations: BiPlug,
}

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.maker.name,
      url: site.url,
      logo: `${site.url}/inane.svg`,
      sameAs: [site.maker.href, site.maker.x],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#cherry`,
      name: site.cherry.name,
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Music player",
      operatingSystem: "Windows",
      softwareVersion: site.cherry.version,
      description: site.cherry.description,
      url: site.cherry.repo,
      image: `${site.url}/screenshot.webp`,
      downloadUrl: site.cherry.releases,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": `${site.url}/#organization` },
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
})

export function meta() {
  const title = `${site.domain} - ${site.cherry.name}, a YouTube Music Client`
  const description =
    "Cherry is a custom YouTube Music desktop client - not a wrapper - with a fully custom UI, queue control, Discord presence and Last.fm scrobbling."
  const image = `${site.url}${site.ogImage}`
  return [
    { title },
    { name: "description", content: description },
    { name: "author", content: site.maker.name },
    { name: "application-name", content: site.name },
    {
      name: "robots",
      content:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: site.url },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: image },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: title },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@inanetools" },
    { name: "twitter:creator", content: "@inanetools" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: title },
  ]
}

export const links: Route.LinksFunction = () => [
  { rel: "canonical", href: site.url },
]

export default function Home() {
  return (
    <div className="min-h-svh md:pl-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <SiteSidebar />

      <main>
        {/* Cherry */}
        <section
          id="cherry"
          className="relative flex min-h-svh snap-start snap-always items-center overflow-hidden border-b border-border/70"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <DitherBackdrop />
            {/* Fade in from slightly before the center of the screen. */}
            <div className="absolute inset-0 bg-gradient-to-r from-background from-55% to-transparent" />
            {/* Dim the dither a touch. */}
            <div className="absolute inset-0 bg-background/40" />
          </div>
          <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-4">
                <img
                  src="/icons/cherry.webp"
                  alt=""
                  width={773}
                  height={691}
                  className="size-12 shrink-0 object-contain"
                />
                <h1 className="text-5xl leading-[1.02] tracking-tight sm:text-6xl">
                  {site.cherry.name}
                </h1>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
                {site.cherry.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="h-11 rounded-lg px-6">
                  <a
                    href={site.cherry.releases}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon className="size-4" />
                    Releases
                  </a>
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="h-11 rounded-lg px-6"
                    >
                      What, Why, Who?
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <div className="flex items-center gap-3">
                        <img
                          src="/icons/cherry.webp"
                          alt=""
                          width={773}
                          height={691}
                          className="size-8 shrink-0 object-contain"
                        />
                        <DialogTitle>{site.cherry.name}</DialogTitle>
                      </div>
                      <DialogDescription>
                        {site.cherry.about[0]}
                      </DialogDescription>
                    </DialogHeader>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {site.cherry.about[1]}
                    </p>

                    <section>
                      <h3 className="font-heading text-lg font-bold tracking-tight">
                        Features
                      </h3>
                      <div className="mt-3 divide-y divide-border/70 border-y border-border/70">
                        {site.cherry.features.map((feature: Feature) => {
                          const Icon = FEATURE_ICONS[feature.icon]
                          return (
                            <div
                              key={feature.title}
                              className="grid gap-x-6 gap-y-1 py-3 sm:grid-cols-[180px_1fr]"
                            >
                              <div className="flex items-center gap-2">
                                <Icon className="size-4 shrink-0 text-muted-foreground" />
                                <span className="font-heading text-sm">
                                  {feature.title}
                                </span>
                              </div>
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {feature.body}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </section>

                    <section>
                      <h3 className="font-heading text-lg font-bold tracking-tight">
                        What, Why, Who?
                      </h3>
                      <Accordion
                        type="single"
                        collapsible
                        className="mt-2 w-full"
                      >
                        {site.cherry.faq.map((item, i) => (
                          <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="py-3 text-left text-sm">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="h-auto text-sm leading-relaxed text-muted-foreground">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </section>

                    <section>
                      <h3 className="font-heading text-lg font-bold tracking-tight">
                        Disclaimer
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {site.cherry.disclaimer}
                      </p>
                    </section>

                    <div className="flex flex-wrap gap-3">
                      <Button asChild size="lg" className="h-11 rounded-lg px-6">
                        <a
                          href={site.cherry.repo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <GitHubIcon className="size-4" />
                          GitHub
                        </a>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="flex items-center">
              <img
                src="/screenshot-compact.webp"
                alt="The Cherry app playing a track"
                width={1400}
                height={877}
                className="w-full rounded-[8px] border border-border/70 md:h-[55vh] md:w-auto md:max-w-none"
              />
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="flex min-h-svh snap-start snap-always items-center border-b border-border/70 px-6 md:px-12"
        >
          <div className="mx-auto w-full max-w-3xl">
            <img src="/inane.svg" alt="inane" className="h-8 w-auto" />
            <p className="mt-6 max-w-2xl text-2xl leading-snug tracking-tight text-pretty sm:text-3xl">
              {site.about.body}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a
                href={site.maker.x}
                target="_blank"
                rel="noreferrer"
                aria-label="inane on X"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <XIcon className="size-5" />
              </a>
              <a
                href={site.maker.href}
                target="_blank"
                rel="noreferrer"
                aria-label="inane on GitHub"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <GitHubIcon className="size-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
