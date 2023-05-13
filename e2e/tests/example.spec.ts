import { expect, test } from '@playwright/test'
import { AppHelper } from './appHelper'

test('Login', async ({ page, baseURL, request }) => {
  page.setDefaultTimeout(10000)

  AppHelper.resetApp({ page, baseURL, request })

  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/VTJMK/)

  // Go to login page
  await page.getByRole('link', { name: 'Prisijungti' }).click()

  await expect(page).toHaveURL('/login')

  // Login with invalid credentials
  await page.getByLabel('El. paštas').fill('admin@example.com')
  await page.getByLabel('Slaptažodis').fill('invalid password')

  await page.getByRole('button', { name: 'Prisijungti' }).click()

  await expect(page).toHaveURL('/login')

  // Login with valid credentials
  await page.getByLabel('El. paštas').fill('admin@example.com')
  await page.getByLabel('Slaptažodis').fill('password')

  await page.getByRole('button', { name: 'Prisijungti' }).click()

  await expect(page).toHaveURL('/')

  // Expect to see authorized content
  expect(page.getByText('John Doe')).toBeDefined()
})

test('Database reset', async ({ page, baseURL, request }) => {
  const appHelper = new AppHelper({ baseURL, request, page })

  // Clear database
  await appHelper.resetDb()

  // Verify
  const response = await request.get(`${appHelper.appUrl}/api/debug/database`)

  // Make sure to update this count after changing `seeds.rb`
  expect((await response.json()).usersCount).toBe(6)
})

test('Time manipulations', async ({ page, baseURL, request }) => {
  const appHelper = new AppHelper({ baseURL, request, page })

  const nowTimestamp = new Date().getTime()
  const minutePrecision = 60000
  const dateInThePast = new Date('2023-04-01')

  // Freeze time
  await appHelper.timeTravelTo(dateInThePast)
  let response = await request.post(`${appHelper.appUrl}/api/e2e/time_travel`, { data: { time: dateInThePast } })
  expect(response.status()).toEqual(204)

  // Get current time
  response = await request.get(`${appHelper.appUrl}/api/debug/time`)
  let receivedDate = new Date((await response.json()).time)

  expect(Math.abs(receivedDate.getTime() - dateInThePast.getTime())).toBeLessThan(minutePrecision)

  // Return time
  await appHelper.timeReturn()

  // Get current time
  response = await request.get(`${appHelper.appUrl}/api/debug/time`)
  receivedDate = new Date((await response.json()).time)

  expect(Math.abs(receivedDate.getTime() - nowTimestamp)).toBeLessThan(minutePrecision)
})
