import { useState } from "react"
import { Link } from "react-router"
import { motion } from "motion/react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"
import { Coverflow } from "~/components/home/coverflow"
import FadeContent from "~/components/react-bits/FadeContent/FadeContent"
import { apps, type App } from "~/data/apps"
import { site } from "~/data/site"

function ActiveAppInfo({
  app,
  index,
  count,
}: {
  app: App
  index: number
  count: number
}) {
  return (
    <motion.div
      key={app.slug}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src={app.icon}
          alt=""
          className="size-10 rounded-xl border border-border shadow-sm sm:size-12"
        />
        <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
          {app.name}
        </h1>
      </div>
      <p className="mt-3 max-w-md text-sm text-pretty text-muted-foreground sm:text-base">
        {app.blurb}
      </p>
      <Button asChild size="lg" className="mt-5 rounded-full px-6">
        <Link to={`/apps/${app.slug}`}>
          View app
          <ArrowUpRight />
        </Link>
      </Button>
      <p className="mt-4 text-xs text-muted-foreground">
        {index + 1} / {count}
      </p>
    </motion.div>
  )
}

export function meta() {
  return [{ title: "inane.tools" }]
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const last = apps.length - 1

  return (
    <main className="relative mx-auto flex min-h-svh w-full max-w-5xl flex-col items-center px-4 pb-40">
      <section
        id="apps"
        className="flex min-h-svh w-full scroll-mt-6 flex-col items-center justify-center gap-8 sm:gap-10"
      >
        <div className="w-full">
          <Coverflow
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
          />
        </div>

        <div className="flex w-full max-w-2xl items-center justify-center gap-4 sm:gap-8">
          <Button
            variant="outline"
            size="icon"
            className="size-10 shrink-0 rounded-full"
            aria-label="Previous app"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            <ChevronLeft className="size-5" />
          </Button>

          <ActiveAppInfo
            app={apps[activeIndex]}
            index={activeIndex}
            count={apps.length}
          />

          <Button
            variant="outline"
            size="icon"
            className="size-10 shrink-0 rounded-full"
            aria-label="Next app"
            disabled={activeIndex === last}
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </section>

      <section id="faq" className="mt-28 flex w-full scroll-mt-6 flex-col">
        <FadeContent blur delay={100} duration={900}>
          <h2 className="mb-8 font-heading text-3xl font-bold tracking-tight">
            Questions &amp; answers
          </h2>
        </FadeContent>

        <FadeContent blur delay={200} duration={900}>
          <Accordion type="single" collapsible className="w-full">
            {site.faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeContent>
      </section>

      <section id="info" className="mt-28 flex w-full scroll-mt-6 flex-col">
        <FadeContent blur delay={100} duration={900}>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight">
            About
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
            {site.about}
          </p>
        </FadeContent>

        <FadeContent blur delay={200} duration={900}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {site.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="mt-10 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. made with 💜 in finland
          </p>
        </FadeContent>
      </section>
    </main>
  )
}
