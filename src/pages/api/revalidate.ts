import { type Readable } from "stream"
import { type NextApiRequest, type NextApiResponse } from "next"
import { env } from "@/env.mjs"
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook"
import { head } from "lodash"

const SANITY_WEBHOOK_SECRET = env.SANITY_WEBHOOK_SECRET

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
}

/**
 * @see {@link https://github.com/sanity-io/webhook-toolkit#usage-with-nextjs}
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = getStringFrom(req.headers[SIGNATURE_HEADER_NAME])

  if (!signature) {
    res.status(401).json({ success: false, message: "Invalid request" })
    return
  }

  const body = await readBody(req)

  // Validate signature
  const isValid = isValidSignature(body, signature, SANITY_WEBHOOK_SECRET)

  console.log(`===== Is the webhook request valid? ${String(isValid)}`)

  if (!isValid) {
    res.status(401).json({ success: false, message: "Invalid request" })
    return
  }

  try {
    // TODO: Add specific path validation
    // const pathToRevalidate = req.body.slug.current

    // console.log(`===== Revalidating: ${pathToRevalidate}`)

    await res.revalidate("/")

    return res.json({ revalidated: true })
  } catch (err) {
    // Could not revalidate. The stale page will continue to be shown until

    // this issue is fixed.

    return res.status(500).send("Error while revalidating")
  }
}

function getStringFrom(input?: string | string[]) {
  if (!input || typeof input === "string") {
    return input
  }

  return head(input)
}

async function readBody(readable: Readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString("utf8")
}
