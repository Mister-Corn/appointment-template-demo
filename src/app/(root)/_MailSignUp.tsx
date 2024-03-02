import { fetchPageData } from "@/sanity/lib/fetchers"
import { PortableText } from "@portabletext/react"

import styles from "./_MailSignUp.module.css"
import { MailSignUpForm } from "./_MailSignUpForm"

export default async function MailSignUp() {
  const { sectionEmailSignUp } = await fetchPageData()

  if (!sectionEmailSignUp) {
    console.error("No MailSignUp CMS data found from Sanity")
    return null
  }

  const { sectionTitle, sectionParagraph } = sectionEmailSignUp

  return (
    <section
      id="section--mail-sign-up"
      className="section-p relative grid gap-6 bg-gradient-to-b from-white to-secondary text-center [&>*]:z-10"
    >
      <div className={styles.maillistTriangle} />

      <h2 className="headings">{sectionTitle}</h2>

      {sectionParagraph && (
        <div className="prose prose-stone mx-auto">
          <PortableText value={sectionParagraph} />
        </div>
      )}

      <MailSignUpForm />
    </section>
  )
}
