import {
  BiEdit,
  BiLink,
  BiDesktop,
  BiPalette,
  BiSolidKeyboard,
  BiWindowAlt,
} from "react-icons/bi"
import { Button } from "~/components/ui/button"
import { GitHubIcon } from "~/components/icons/github-icon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { site } from "~/data/site"
const icons = {
  custom: BiWindowAlt,
  library: BiEdit,
  media: BiDesktop,
  link: BiLink,
  themes: BiPalette,
  keyboard: BiSolidKeyboard,
}
export function BoardSection() {
  return (
    <section
      id="board"
      className="relative flex min-h-svh snap-start snap-always items-center overflow-hidden border-b border-border/70 py-20 md:py-0"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#e9e9ee]/25 via-[#e9e9ee]/[0.08] via-35% to-background to-75%" />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-12">
        <div className="order-2 flex items-center md:order-1 md:justify-end">
          <img
            src={site.board.screenshot}
            alt="Board with notes, nested boards, images and a video arranged on its canvas"
            width={1398}
            height={900}
            loading="lazy"
            className="w-full rounded-[8px] border border-border/70 md:h-[55vh] md:w-auto md:max-w-none"
          />
        </div>
        <div className="order-1 max-w-xl md:order-2">
          <div className="flex items-center gap-4">
            <img
              src="/icons/board.webp"
              alt=""
              width={48}
              height={48}
              className="size-12 shrink-0 object-contain"
            />
            <h2 className="text-5xl leading-[1.02] tracking-tight sm:text-6xl">
              {site.board.name}
            </h2>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
            {site.board.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 items-center justify-center gap-2 rounded-lg px-6 leading-none"
            >
              <a href={site.board.downloads.windows}>
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M1 1h10v10H1zM13 1h10v10H13zM1 13h10v10H1zM13 13h10v10H13z" />
                </svg>
                Windows
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
                      src="/icons/board.webp"
                      alt=""
                      width={48}
                      height={48}
                      className="size-8 shrink-0 object-contain"
                    />
                    <DialogTitle>{site.board.name}</DialogTitle>
                  </div>
                  <DialogDescription>{site.board.about[0]}</DialogDescription>
                </DialogHeader>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {site.board.about[1]}
                </p>
                <section>
                  <h3 className="font-heading text-lg font-bold tracking-tight">
                    Features
                  </h3>
                  <div className="mt-3 divide-y divide-border/70 border-y border-border/70">
                    {site.board.features.map((feature) => {
                      const Icon = icons[feature.icon]
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
                  <Accordion type="single" collapsible className="mt-2 w-full">
                    {site.board.faq.map((item, index) => (
                      <AccordionItem
                        key={item.question}
                        value={"board-" + index}
                      >
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
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="h-11 rounded-lg px-6">
                    <a href={site.board.repo} target="_blank" rel="noreferrer">
                      <GitHubIcon className="size-4" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {site.board.version} · Windows x64 ·{" "}
            <a
              href={site.board.releases}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Release notes
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
