import { EventParticipation, User } from '../../hooks/api/schemas'

export type ParticipationWithUser = Readonly<EventParticipation & { user: Readonly<User> }>
