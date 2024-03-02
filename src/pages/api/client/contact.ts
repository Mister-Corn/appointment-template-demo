import { type NextApiRequest, type NextApiResponse } from "next"
import { env } from "@/env.mjs"
import {
  contactFormBodySchema,
  type ContactFormBody,
} from "@/utils/clientApi/contact-us"
import type { MailDataRequired } from "@sendgrid/mail"
import sgMailClient from "@sendgrid/mail"

// Initalize SendGrid mail client
sgMailClient.setApiKey(env.SENDGRID_API_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  // Verify POSt body
  const verifyResult = contactFormBodySchema.safeParse(req.body)

  if (!verifyResult.success) {
    return res.status(400).end()
  }

  const resStatus = await sendContactEmailWithSendGrid(verifyResult.data)
  return res.status(resStatus).end()
}

async function sendContactEmailWithSendGrid({
  email,
  subject,
  message,
}: ContactFormBody) {
  const msg: MailDataRequired = {
    from: env.EMAIL_FROM,
    to: env.EMAIL_CONTACT,
    subject,
    html: `<html>
    <body style="display:flex;flex-direction:column;gap:0.75rem;">
      <h1>${subject}</h1>
      <h2>From ${email}</h2>
      <p>${message}</p>
      <hr />
      <a href="mailto:${email}">Reply back</a>
    </body>
  </html>`,
  }
  const response = await sgMailClient.send(msg)
  const [{ statusCode }] = response

  if (statusCode >= 400) {
    throw new Error(`Error status ${statusCode}`)
  }

  return statusCode
}
