"use client"

import {
  emailListBodySchema,
  postNewEmailSubscriber,
  type EmailListBody,
} from "@/utils/clientApi/email-list"
import { zodResolver } from "@hookform/resolvers/zod"
import { ToastAction } from "@radix-ui/react-toast"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast/use-toast"
import { Icons } from "@/components/icons"

export function MailSignUpForm() {
  const { toast } = useToast()

  const { mutateAsync, status: emailSignUpStatus } = useMutation(
    postNewEmailSubscriber
  )

  const form = useForm<EmailListBody>({
    resolver: zodResolver(emailListBodySchema),
    defaultValues: { email: "" },
  })

  const onSubmit = form.handleSubmit(() => {
    return mutateAsync({ email: "test@test.com" })
      .then(() => {
        toast({ description: "You are now subscribed. Thank you!" })
      })
      .catch((err) => {
        console.error(err)

        toast({
          variant: "destructive",
          title: "Uh oh!",
          description: "We could not subscribe you to the list.",
          action: (
            // @see {@link https://github.com/orgs/react-hook-form/discussions/8020}*/
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <ToastAction altText="Try again" onClick={onSubmit}>
              Try again
            </ToastAction>
          ),
        })
      })
  })

  return (
    <Form {...form}>
      {/* @see {@link https://github.com/orgs/react-hook-form/discussions/8020}*/}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={onSubmit}>
        <div className="mx-auto grid max-w-lg gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    disabled={["loading", "success"].includes(
                      emailSignUpStatus
                    )}
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className={cn(buttonVariants(), "w-full")}
            disabled={["loading", "success"].includes(emailSignUpStatus)}
          >
            {
              {
                idle: "Submit",
                loading: "Submitting...",
                error: "Try again",
                success: (
                  <>
                    <Icons.checkmark className="mr-2 h-5 w-5" /> Subscribed!
                    Thank you.
                  </>
                ),
              }[emailSignUpStatus]
            }
          </button>
        </div>
      </form>
    </Form>
  )
}
