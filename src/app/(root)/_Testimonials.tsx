import { type ReactNode } from "react"
import { fetchPageData } from "@/sanity/lib/fetchers"
import { type TestimonialSanityResponse } from "@/sanity/schemas/sanitySchemaTestimonials"
import { PortableText } from "@portabletext/react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/icons"

export default async function Testimonials() {
  const { testimonials } = await fetchPageData()

  if (!Array.isArray(testimonials)) {
    return null
  }

  return (
    <section id="section--testimonials" className="section-p space-y-6">
      <h2 className="headings text-center">Testimonials</h2>

      <div className="container w-full place-items-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 xl:grid-cols-3">
        {testimonials.map(({ endorser, location, highlight, testimonial }) => {
          return (
            <Card
              key={`${endorser}${location}`}
              className="mx-auto flex h-full w-full max-w-[420px] flex-col"
            >
              <CardHeader>
                <CardTitle>From {endorser}</CardTitle>
                <CardDescription>{location}</CardDescription>
              </CardHeader>

              <CardContent className="relative basis-full">
                <Icons.quote className="absolute left-[15%] top-[-10%] h-24 w-24 text-secondary/30" />
                <q className="relative z-10 italic">{highlight}</q>
              </CardContent>

              <OpenFullTestimonial
                endorser={endorser}
                testimonial={testimonial}
              >
                <Button
                  variant="default"
                  className="relative z-10 w-full rounded-t-none py-2"
                >
                  Read more
                </Button>
              </OpenFullTestimonial>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

function OpenFullTestimonial({
  endorser,
  testimonial,
  children,
}: Pick<TestimonialSanityResponse, "endorser" | "testimonial"> & {
  children: ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader className="font-medium">From {endorser}:</DialogHeader>

        <div className="prose prose-stone">
          <PortableText value={testimonial} />
        </div>

        <DialogClose asChild>
          <button className={buttonVariants({ variant: "link" })}>Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
