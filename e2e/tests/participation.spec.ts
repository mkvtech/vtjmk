import { expect, test } from '@playwright/test'
import { AppHelper } from './appHelper'

test('Participation', async ({ page, baseURL, request }) => {
  page.setDefaultTimeout(3000)

  console.log(process.env.APP_URL)
  console.log(process.env.FRONTEND_URL)

  AppHelper.resetApp({ page, baseURL, request })

  await page.goto('/')

  // Create Account
  await page.getByRole('link', { name: 'Prisijungti' }).click()

  await expect(page).toHaveURL('/login')

  await page.getByRole('link', { name: 'Sukurti paskyrą' }).click()

  await page.getByLabel('Vardas ir pavardė *').fill('Maksim Kulagin')
  await page.getByLabel('El. paštas *').fill('maksim.kulagin@example.com')
  await page.getByLabel('Slaptažodis *').fill('password')

  await page.getByRole('button', { name: 'Užsiregistruoti' }).click()

  await expect(page).toHaveURL('/')

  // Create Participation request

  // Upload files

  // Add comment

  // Login as manager

  // Assign a reviewer

  // Login as reviewer

  // Approve

  // Add comment
})
