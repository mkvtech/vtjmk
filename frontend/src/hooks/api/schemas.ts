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

export const commentSchema = z.object({
  id: z.string(),
  text: z.string(),

  userId: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    fullName: z.string(),
    avatarUrl: z.string(),
  }),

  createdAt: z.string().transform(isoToDate),
  updatedAt: z.string().transform(isoToDate),
})

export const currentUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
  avatarUrl: z.string(),
})
export type CurrentUser = z.infer<typeof currentUserSchema>

export const eventStatusSchema = z.union([z.literal('open'), z.literal('hidden')])
export type EventStatus = z.infer<typeof eventStatusSchema>

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  conferenceId: z.string(),
  date: z.string().transform(isoToDate),
  registrationFrom: z.string().transform(isoToDate),
  registrationTo: z.string().transform(isoToDate),
  status: eventStatusSchema,
})
export type Event = z.infer<typeof eventSchema>

export const eventReviewerSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  reviewerId: z.string(),
  reviewer: z.object({
    id: z.string(),
    email: z.string(),
    fullName: z.string(),
    avatarUrl: z.string(),
  }),
  createdAt: z.string().transform(isoToDate),
  updatedAt: z.string().transform(isoToDate),
})
export type EventReviewer = z.infer<typeof eventReviewerSchema>

const userSchemaSimple = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
  avatarUrl: z.string(),
})
export type UserSimple = z.infer<typeof userSchemaSimple>

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
  avatarUrl: z.string(),
  createdAt: z.string().transform(isoToDate),
  updatedAt: z.string().transform(isoToDate),
})
export type User = z.infer<typeof userSchema>

export const participationStatusSchema = z.union([z.literal('pending'), z.literal('approved'), z.literal('rejected')])
export type ParticipationStatus = z.infer<typeof participationStatusSchema>

export const reviewStatusSchema = z.union([z.literal('pending'), z.literal('approved'), z.literal('rejected')])
export type ReviewStatus = z.infer<typeof reviewStatusSchema>

export const participationReviewSchema = z.object({
  id: z.string(),
  status: reviewStatusSchema,
  comment: z.string().nullable(),
  userId: z.string(),
  user: userSchemaSimple,
  createdAt: z.string().transform(isoToDate),
  updatedAt: z.string().transform(isoToDate),
})
export type ParticipationReview = z.infer<typeof participationReviewSchema>

export const participationSchema = z.object({
  id: z.string(),

  userId: z.string(),
  user: userSchemaSimple,

  eventId: z.string(),
  event: z.object({
    id: z.string(),
    title: z.string(),
    date: z.string().transform(isoToDate),
  }),

  reviewerId: z.string().nullable(),
  reviewer: userSchemaSimple.nullable(),

  status: participationStatusSchema,
  submissionTitle: z.string().nullable(),
  submissionDescription: z.string().nullable(),
  submissionFiles: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      size: z.number(),
      downloadUrl: z.string(),
    })
  ),

  reviews: z.array(participationReviewSchema).nullable(),

  createdAt: z.string().transform(isoToDate),
  updatedAt: z.string().transform(isoToDate),
})
export type Participation = z.infer<typeof participationSchema>

export const participationAvailableReviewerSchema = z.object({
  id: z.string(),
  reviewerId: z.string(),
  reviewer: z.object({
    id: z.string(),
    email: z.string(),
    fullName: z.string(),
    avatarUrl: z.string(),
  }),
  createdAt: z.string().transform(isoToDate),
  updatedAt: z.string().transform(isoToDate),
})

export const eventParticipationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: userSchemaSimple,
  eventId: z.string(),
  order: z.number().nullable(),
  time: z.number().nullable(),
  status: participationStatusSchema,
  submissionTitle: z.string().nullable(),
  comment: z.string().optional(),
  createdAt: z.string().transform(isoToDate),
  updatedAt: z.string().transform(isoToDate),
})
export type EventParticipation = z.infer<typeof eventParticipationSchema>

export const userParticipationSchema = z.object({
  id: z.string(),

  status: participationStatusSchema,
  submissionTitle: z.string().nullable(),
  submissionDescription: z.string().nullable(),

  userId: z.string(),
  user: userSchemaSimple,

  reviewerId: z.string().nullable(),
  reviewer: userSchemaSimple.nullable(),

  eventId: z.string(),
  event: eventSchema,

  createdAt: z.string().transform(isoToDate),
  updatedAt: z.string().transform(isoToDate),
})
export type UserParticipation = z.infer<typeof userParticipationSchema>

export const userParticipationsSchema = z.array(userParticipationSchema)

export const userParticipationsDocumentTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
})
export const userParticipationsDocumentTemplatesSchema = z.array(userParticipationsDocumentTemplateSchema)

export const conferenceDocumentTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  documentType: z.string(),
  createdAt: z.string().transform(isoToDate),
  updatedAt: z.string().transform(isoToDate),
})
export const conferenceDocumentTemplatesSchema = z.array(conferenceDocumentTemplateSchema)

export const permissionSchema = z.object({
  id: z.string(),
  action: z.string(),
  target: z.object({
    id: z.string(),
    title: z.string(),
  }),
  targetId: z.string(),
  targetType: z.string(),
  user: userSchema,
  createdAt: z.string().transform(isoToDate),
  updatedAt: z.string().transform(isoToDate),
})
export type Permission = z.infer<typeof permissionSchema>

export const permissionsSchema = z.array(permissionSchema)
