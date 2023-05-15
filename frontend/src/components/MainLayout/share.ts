import { z } from 'zod'

export const DRAWER_WIDTH = 300
export const TOP_BAR_HEIGHT = 116

export const sideMenuPoliciesSchema = z.object({
  policies: z.object({
    user: z.object({
      general: z.object({
        admin: z.boolean(),
        manageEvents: z.boolean(),
        reviewsIndex: z.boolean(),
      }),
    }),
  }),
})
export type SideMenuPolicies = z.infer<typeof sideMenuPoliciesSchema>
