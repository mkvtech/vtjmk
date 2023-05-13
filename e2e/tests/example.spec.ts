import { expect, test } from '@playwright/test'

test('Login', async ({ page }) => {
  page.setDefaultTimeout(10000)

  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/VTJMK/)

  // Go to login page
  await page.getByRole('link', { name: 'Login' }).click()

  await expect(page).toHaveURL('/login')

  // Login with invalid credentials
  await page.getByLabel('Email').fill('admin@example.com')
  await page.getByLabel('Password').fill('invalid password')

  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL('/login')

  // Login with valid credentials
  await page.getByLabel('Email').fill('admin@example.com')
  await page.getByLabel('Password').fill('password')

  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL('/')

  // Expect to see authorized content
  expect(page.getByText('John Doe')).toBeDefined()
})

test('Database reset', async ({ baseURL, request }) => {
  // Clear database
  let response = await request.post(`${baseURL}/api/e2e/db_reset`, {})
  expect(response.status()).toEqual(204)

  // Verify
  response = await request.get(`${baseURL}/api/debug/database`)

  // Make sure to update this count after changing `seeds.rb`
  expect((await response.json()).usersCount).toBe(6)
})

test('Time manipulations', async ({ baseURL, request }) => {
  const nowTimestamp = new Date().getTime()
  const hourPrecision = 3600000
  const dateInThePast = new Date('2023-04-01')

  // Get current time
  let response = await request.get(`${baseURL}/api/debug/time`)
  let receivedDate = new Date((await response.json()).time)

  expect(Math.abs(receivedDate.getTime() - nowTimestamp)).toBeLessThan(hourPrecision)

  // Freeze time
  response = await request.post(`${baseURL}/api/e2e/time_travel`, { data: { time: dateInThePast } })
  expect(response.status()).toEqual(204)

  // Get current time
  response = await request.get(`${baseURL}/api/debug/time`)
  receivedDate = new Date((await response.json()).time)

  expect(Math.abs(receivedDate.getTime() - dateInThePast.getTime())).toBeLessThan(hourPrecision)

  // Return time
  response = await request.post(`${baseURL}/api/e2e/time_return`, {})
  expect(response.status()).toEqual(204)

  // Get current time
  response = await request.get(`${baseURL}/api/debug/time`)
  receivedDate = new Date((await response.json()).time)

  expect(Math.abs(receivedDate.getTime() - nowTimestamp)).toBeLessThan(hourPrecision)
})
