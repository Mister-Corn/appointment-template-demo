import { type NextApiRequest, type NextApiResponse } from "next"
import { env } from "@/env.mjs"
import { emailListBodySchema } from "@/utils/clientApi/email-list"
import sendGridClient from "@sendgrid/client"
import { type ClientRequest } from "@sendgrid/client/src/request"

sendGridClient.setApiKey(env.SENDGRID_API_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  // Verify POST body
  const verifyResult = emailListBodySchema.safeParse(req.body)

  if (!verifyResult.success) {
    return res.status(400).end()
  }

  // Upsert mail list data to SendGrid marketing contacts.
  // Reference: https://docs.sendgrid.com/api-reference/contacts/add-or-update-a-contact
  const { email } = verifyResult.data

  const body = {
    contacts: [
      {
        email,
      },
    ],
  }

  const request: ClientRequest = {
    url: "/v3/marketing/contacts",
    method: "PUT",
    body,
  }

  return sendGridClient.request(request).then(([response]) => {
    const { statusCode, body } = response
    return res.status(statusCode).send(body)
  })
}
