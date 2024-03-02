import axios from "axios"
import { z } from "zod"

export const CONTACT_FORM_MAX_CHAR_NUM = 1000

export const contactFormBodySchema = z.object({
  subject: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").email("Please enter a valid email"),
  message: z
    .string()
    .min(1, "Required")
    .max(CONTACT_FORM_MAX_CHAR_NUM, "Please shorten your message 🙏"),
})

export type ContactFormBody = z.infer<typeof contactFormBodySchema>

export async function postNewContactEmail(body: ContactFormBody) {
  return axios.post<ContactFormBody, undefined>("/api/client/contact", body)
}
