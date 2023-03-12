import { z } from 'zod'

const isoToDate = (isoDate: string): Date => new Date(isoDate)

export const attendanceStatusSchema = z.union([z.literal('pending'), z.literal('approved'), z.literal('rejected')])
export type AttendanceStatus = z.infer<typeof attendanceStatusSchema>

export const attendanceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  eventId: z.string(),
  status: attendanceStatusSchema,
  comment: z.string().optional(),
  createdAt: z.string().transform(isoToDate),
  updatedAt: z.string().transform(isoToDate),
})
export type Attendance = z.infer<typeof attendanceSchema>

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
})
export type User = z.infer<typeof userSchema>
