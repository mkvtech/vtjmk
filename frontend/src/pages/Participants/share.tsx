import { Participation, User } from '../../hooks/api/schemas'

export type ParticipationWithUser = Readonly<Participation & { user: Readonly<User> }>
