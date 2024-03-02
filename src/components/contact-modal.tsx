"use client"

import { type ReactNode } from "react"
import {
  CONTACT_FORM_MAX_CHAR_NUM,
  contactFormBodySchema,
  postNewContactEmail,
  type ContactFormBody,
} from "@/utils/clientApi/contact-us"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/toast/use-toast"

import { Icons } from "./icons"

export type ContactUsModalProps = {
  children: ReactNode
}

export function ContactUsModal({ children }: ContactUsModalProps) {
  const { toast } = useToast()

  // TODO: Check why error emailSendStatus doesn't stick upon reject
  const {
    mutateAsync,
    status: emailSendStatus,
    reset: resetMutation,
  } = useMutation(postNewContactEmail)

  const form = useForm<ContactFormBody>({
    resolver: zodResolver(contactFormBodySchema),
    defaultValues: { email: "", subject: "", message: "" },
  })

  const onSubmit = form.handleSubmit((values) => {
    return mutateAsync(values)
      .then(() => {
        toast({ description: "Email has been sent. Thank you!" })
      })
      .catch((err) => {
        console.error(err)

        toast({
          variant: "destructive",
          title: "Uh oh!",
          description:
            "We ran into an issue. Please try again in a little while.",
        })
      })
  })

  const resetOnCloseIfSuccess = () => {
    if (emailSendStatus === "success") {
      resetMutation()
      form.reset()
    }
  }

  const {
    currNumOfCharsInMessage,
    maxNumOfCharsInMessage,
    isMessageOverCharLimit,
  } = useTrackCharacterCount(form.watch("message"))

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent onCloseAutoFocus={resetOnCloseIfSuccess}>
        <DialogHeader className="text-lg font-medium">
          Contact me personally
        </DialogHeader>

        <Form {...form}>
          <form
            autoComplete="off"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={onSubmit}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Subject" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type your message here" {...field} />
                  </FormControl>

                  <div className="flex gap-4">
                    <FormMessage />

                    <span>
                      <span
                        className={cn({
                          "font-medium text-destructive":
                            isMessageOverCharLimit,
                        })}
                      >
                        {currNumOfCharsInMessage}
                      </span>{" "}
                      <span className="text-sm">/{maxNumOfCharsInMessage}</span>{" "}
                    </span>
                  </div>
                </FormItem>
              )}
            />

            <button
              type="submit"
              className={cn(buttonVariants(), "w-full")}
              disabled={["loading", "success"].includes(emailSendStatus)}
            >
              {
                {
                  idle: "Send email",
                  loading: "Sending...",
                  error: "Try again",
                  success: (
                    <>
                      <Icons.checkmark className="mr-2 h-5 w-5" /> Sent. Thank
                      you!
                    </>
                  ),
                }[emailSendStatus]
              }
            </button>
          </form>
        </Form>

        <DialogClose asChild>
          <button className={buttonVariants({ variant: "link" })}>Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

function useTrackCharacterCount(currentMessage?: string) {
  const currNumOfCharsInMessage = currentMessage?.length ?? 0
  const maxNumOfCharsInMessage = CONTACT_FORM_MAX_CHAR_NUM
  const isMessageOverCharLimit =
    currNumOfCharsInMessage > maxNumOfCharsInMessage

  return {
    currNumOfCharsInMessage,
    maxNumOfCharsInMessage,
    isMessageOverCharLimit,
  }
}
