import { APIRequestContext, Page, expect } from '@playwright/test'

interface AppHelperOptions {
  page: Page
  request: APIRequestContext
  baseURL: string | undefined
}

// Helper functions specific to the App
export class AppHelper {
  static resetApp(testOptions: AppHelperOptions) {
    const appHelper = new AppHelper(testOptions)

    appHelper.resetDb()
    appHelper.travelTo2023_04_01()

    return appHelper
  }

  constructor(public testOptions: AppHelperOptions) {}

  async resetDb() {
    const response = await this.testOptions.request.post(`${process.env.APP_URL}/api/e2e/db_reset`, {})
    expect(response.status()).toEqual(204)
  }

  async travelTo2023_04_01() {
    const response = await this.testOptions.request.post(`${process.env.APP_URL}/api/e2e/time_travel`, {
      data: { time: new Date('2023-04-01') },
    })
    expect(response.status()).toEqual(204)
  }
}
