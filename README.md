# Appointment Demo App

This app is for clients wishing to have a page that not only describes the life coaching/mentorship services they provide, but also allow them to book appointments through Calendly and to sign up for updates and newsletters via email.

While the visual appearance and layout is custom-coded, clients are able to update information and images on the website on their own through a Content Management System via Sanity.

In order to access the Sanity Studio, you will need to create a Sanity CMS account, and then wait to be invited to the project. The much easier way to visually see the studio is [viewing this Studio walkthrough](./README/admin-walkthrough.md).

This app is based off of actual work I did in the past.

## ⚠ **Warning** ⚠

**<u>This app is a demonstration</u>**. No actual service is being advertised. Appointments made via Calendly will **NOT** be honored.

You should not input personal information in this app. Receiving and storing information, like receiving and storing email addresses, is disabled.

## Tech Stack

This project is bootstrapped with [create-t3-app](https://create.t3.gg/). This app is deployed with [Vercel](https://vercel.com/).

### Main content

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)

Next.js is used because:

- Built in ability to easily add API routes.
- Provides a way to take advantage of React Server Components (RSC), streamlining the use of static and server-side generated pages and reducing the JS sent to the client.
- Uses React, which allows tapping into popular component libraries (particularly [Radix UI primitives](https://www.radix-ui.com/primitives) and [shadcn/ui](https://ui.shadcn.com/)).

The access to the React ecosystem is the main determinant of using Next.js, although my healthy amount of experience in React is also a determinant as well. With that said, this app would also work really well with [Astro](https://astro.build).

For styling, TailwindCSS is used. The class name soup is a little wild yes, but overall, I have found styling with Tailwind to be a consistent and enjoyable experience. There are escape hatches using CSS modules for complex one-off styling, such as the triangle background gradient in the mail list sign up form.

In this app, there are some patterns, like using custom classes for section element styling, that I have moved away from. I now prefer to be explicit in what CSS is being applied to each element, rather than creating CSS classes that apply to multiple elements in the background. I've embraced the class soup, creating discrete components when the soup gets a little much.

If I were to not use Tailwind, I would use LESS/SASS with BEM methodology. BEM's strict naming and use of classes prevents specificity wars and leads to a styling experience like Tailwind.

### Content Management System

- [Sanity CMS](https://www.sanity.io/)

Content is managed by Sanity CMS. Clients can add and edit content on their page by logging in to Sanity Studio. This app hosts the [Sanity Studio](https://www.sanity.io/docs/sanity-studio), configured with schemas bespoke to the page. Clients can access the studio by navigating to the `/admin/studio` route.

After logging on, clients will be able to change the copy on the various sections of the page, add/edit the services they offer, and manage testimonials to display on the page. Clients can also upload images for the header section, their personal bio picture, and for each service.

### Backend

- [Next.js (`/api` routes)](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
- [SendGrid](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/authentication)

Next.js' API routes are used for sending contact emails and saving potential customer info in SendGrid. In addition, there is a `/api/revalidate` webhook route. When the client makes updates to their page within Sanity CMS, Sanity will fire an event to this webhook, which instructs the app to rebuild the page with updated content. This allows the page to be responsive to changes within the CMS while maintaining the speed of build-time generation.

SendGrid is a third-party customer communication platform for transactional and marketing email. Linking the app with SendGrid enables saving email addresses to SendGrid's contacts. Then the client can set up single-send emails and email templates that can be sent to those contacts. Those contacts can be exported to CSV if the client wishes.

#### Unused code packages

This app is bootstrapped with [create-t3-app](https://create.t3.gg/) with Prisma and tRPC, but as I started to rely on Sanity CMS and SendGrid, the need these extra packages disappeared.

- React Server Components eliminated the need to have explicit API routes to fetch content from Sanity.
- Saving to and managing contacts with SendGrid meant that a DB was no longer needed to save contact information.

If I had to redo this app again, I would make a plain Next 14 app and manually add Tailwind CSS to it. I would hold off using a DB until the need arises, such as an expansion of the `/admin` part of the app.

This app also has NextAuth configured, but with creative use of the Sanity Studio React components, I can effectively make the client's Sanity account the main way to auth the client. Right now, the Sanity account is used to log onto the studio, but more pages can be made that can only be accessed with the client's Sanity account.
