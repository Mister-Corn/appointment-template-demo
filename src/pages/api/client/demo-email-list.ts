import { type NextApiRequest, type NextApiResponse } from "next"
import { emailListBodySchema } from "@/utils/clientApi/email-list"

/**
 * This email-list POST handler is for demo purposes only. If you want to see
 * how this file is usually structured, see `src/pages/api/client/email-list.ts`.
 */
export default function demoHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  // Verify POST body
  const verifyResult = emailListBodySchema.safeParse(req.body)

  if (!verifyResult.success) {
    return res.status(400).end()
  }

  return res.status(200).json({
    message: "Success. This is a demo; no email information has been saved.",
  })
}
