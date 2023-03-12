import { Attendance, User } from '../../hooks/api/schemas'

export type AttendanceWithUser = Readonly<Attendance & { user: Readonly<User> }>
