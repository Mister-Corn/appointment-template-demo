import axios from "axios"
import { z } from "zod"

export const emailListBodySchema = z.object({
  email: z.string({ required_error: "Please enter your email" }).email(),
  name: z.string().min(1).max(190, "Please shorten your name").optional(),
})

export type EmailListBody = z.infer<typeof emailListBodySchema>

export async function postNewEmailSubscriber(body: EmailListBody) {
  return axios.post<EmailListBody, undefined>(
    "/api/client/demo-email-list",
    body
  )
}
