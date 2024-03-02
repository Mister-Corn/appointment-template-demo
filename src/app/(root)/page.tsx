import AboutMe from "./_AboutMe"
import CallToAction from "./_CallToAction"
import MailSignUp from "./_MailSignUp"
import ServicesSection from "./_Services"
import Testimonials from "./_Testimonials"

export default function IndexPage() {
  return (
    <div className="p-0">
      {/* @ts-expect-error Async Server Component */}
      <CallToAction />
      {/* @ts-expect-error Async Server Component */}
      <MailSignUp />
      {/* @ts-expect-error Async Server Component */}
      <AboutMe />
      {/* @ts-expect-error Async Server Component */}
      <ServicesSection />
      {/* @ts-expect-error Async Server Component */}
      <Testimonials />
    </div>
  )
}
