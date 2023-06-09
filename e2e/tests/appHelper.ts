import { APIRequestContext, Page, expect } from '@playwright/test'

interface AppHelperOptions {
  page: Page
  request: APIRequestContext
  baseURL: string | undefined
}

// Helper functions specific to the App
export class AppHelper {
  static async resetApp(testOptions: AppHelperOptions) {
    const appHelper = new AppHelper(testOptions)

    await appHelper.timeTravelTo2023_04_01()
    await appHelper.resetDb()

    return appHelper
  }

  constructor(public testOptions: AppHelperOptions) {}

  async resetDb() {
    const response = await this.testOptions.request.post(`${this.appUrl}/api/e2e/db_reset`, {})
    expect(response.status()).toEqual(204)
  }

  async timeTravelTo(date: Date) {
    const response = await this.testOptions.request.post(`${this.appUrl}/api/e2e/time_travel`, { data: { time: date } })
    expect(response.status()).toEqual(204)
  }

  async timeTravelTo2023_04_01() {
    return this.timeTravelTo(new Date('2023-04-01'))
  }

  async timeReturn() {
    const response = await this.testOptions.request.post(`${this.appUrl}/api/e2e/time_return`)
    expect(response.status()).toEqual(204)
  }

  get appUrl() {
    return process.env.APP_URL || this.testOptions.baseURL
  }

  async login({ email, password }: { email: string; password?: string }) {
    await this.testOptions.page.getByRole('link', { name: 'Prisijungti' }).click()

    await this.testOptions.page.getByLabel('El. paštas').fill(email)
    await this.testOptions.page.getByLabel('Slaptažodis').fill(password || 'password')

    await this.testOptions.page.getByRole('button', { name: 'Prisijungti' }).click()
  }

  // Fills MUI DatePicker with given date, located by given label, uses LT locale
  async fillMuiDatePickerLt({ label, date }: { label: string; date: string }) {
    const { page } = this.testOptions
    const { keyboard } = page

    await page.getByLabel(label).click()
    await keyboard.press('ArrowLeft')
    await keyboard.press('ArrowLeft')
    await keyboard.type(date)

    await expect(page.getByLabel(label).inputValue()).resolves.toBe(date)
  }
}
