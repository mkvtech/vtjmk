import { Box, Link } from '@mui/material'

export default function DevUi({ onFormFill }: { onFormFill: ({ email }: { email: string }) => void }): JSX.Element {
  return (
    <Box sx={{ bgcolor: 'black', color: '#55ff55', p: 2, mt: 4, border: '4px solid #55ff55', fontFamily: 'monospace' }}>
      <p>
        DEV UI
        <br /> Click to fill form with data
      </p>
      <ul>
        <li>
          <Link onClick={(): void => onFormFill({ email: 'admin@example.com' })}>Admin, admin@example.com</Link>
        </li>
        <li>
          <Link onClick={(): void => onFormFill({ email: 'agne.reynolds@example.com' })}>
            Event Manager, agne.reynolds@example.com
          </Link>
        </li>
        <li>
          <Link onClick={(): void => onFormFill({ email: 'karolis.corkery@example.com' })}>
            Reviewer, karolis.corkery@example.com
          </Link>
        </li>
        <li>
          <Link onClick={(): void => onFormFill({ email: 'vaidas.mcclure@example.com' })}>
            Participant, vaidas.mcclure@example.com
          </Link>
        </li>
      </ul>
    </Box>
  )
}
