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

export const conferenceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
})
export type Conference = z.infer<typeof conferenceSchema>

export const eventStatusSchema = z.union([z.literal('open'), z.literal('hidden')])
export type EventStatus = z.infer<typeof eventStatusSchema>

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  conferenceId: z.string(),
  date: z.string().transform(isoToDate),
  registrationFrom: z.string().transform(isoToDate),
  registrationTo: z.string().transform(isoToDate),
  status: eventStatusSchema,
  participantsLimit: z.number().optional().nullable(),
})
export type Event = z.infer<typeof eventSchema>

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
})
export type User = z.infer<typeof userSchema>

export const participationStatusSchema = z.union([z.literal('pending'), z.literal('approved'), z.literal('rejected')])
export type ParticipationStatus = z.infer<typeof participationStatusSchema>

export const participationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  eventId: z.string(),
  status: attendanceStatusSchema,
  comment: z.string().optional(),
  createdAt: z.string().transform(isoToDate),
  updatedAt: z.string().transform(isoToDate),
})
export type Participation = z.infer<typeof participationSchema>

export const userParticipationSchema = participationSchema.merge(z.object({ event: eventSchema }))
export type UserParticipation = z.infer<typeof userParticipationSchema>

export const userParticipationsSchema = z.array(userParticipationSchema)

export const userParticipationsDocumentTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
})
export const userParticipationsDocumentTemplatesSchema = z.array(userParticipationsDocumentTemplateSchema)
