import { expect, test } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000")

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Raymond Lebagel/)
})

test("CTA 'Book now' link", async ({ page }) => {
  await page.goto("http://localhost:3000")

  // Click the CTA 'Book now' link.
  await page
    .locator("#section--call-to-action")
    .getByRole("button", { name: "Book now" })
    .click()

  // Expect to see Calendly popup.
  const heading = page
    .frameLocator('iframe[title="Calendly Scheduling Page"]')
    .getByRole("heading")
  await expect(heading).toBeVisible()
})

test("Appointment card 'Book now' link", async ({ page }) => {
  await page.goto("http://localhost:3000")

  const appointmentCardBtn = page
    .locator("#section--appointment-card")
    .getByRole("button", { name: "Book now" })

  await expect(appointmentCardBtn).toBeVisible()

  // Click on "Book now" button should display Calendly popup
  await appointmentCardBtn.click()

  const heading = page
    .frameLocator('iframe[title="Calendly Scheduling Page"]')
    .getByRole("heading", { name: /select/i })
  await expect(heading).toBeVisible()
})
