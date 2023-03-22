import { Box, Container, Link, MenuItem, MenuList, Paper, Popper, styled } from '@mui/material'
import dayjs from 'dayjs'
import { SyntheticEvent, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useQueryConferences, useQueryEvents } from '../../hooks/api/quries'

// Reverse engineered from main website ;-;
const AppBarTabLink = styled(Link)((_theme) => ({
  paddingLeft: 16,
  paddingRight: 16,
  textAlign: 'center',
  position: 'relative',
  cursor: 'pointer',
  textDecoration: 'none',
  color: '#0b4dc7',
  height: 60,
  lineHeight: '60px',
  verticalAlign: 'bottom',
  fontSize: '13px',
  fontWeight: 'bold',
  ':hover': {
    color: '#269BF0',
    '&::after': {
      content: '""',
      height: 3,
      width: '100%',
      background: '#269BF0',
      position: 'absolute',
      bottom: -3,
      left: 0,
      borderRadius: 1.5,
    },
  },
  // https://github.com/mui/material-ui/issues/15759#issuecomment-984553630
})) as typeof Link

export default function AppBarTabs(): JSX.Element {
  const [anchorElement, setAnchorElement] = useState<Element | null>(null)
  const [tabMenu, setTabMenu] = useState<readonly { path: string; text: string }[]>([])

  const conferencesQuery = useQueryConferences()
  const eventsQuery = useQueryEvents({ from: dayjs().startOf('day').toString() })

  const appBarTabsStructure = [
    {
      text: 'Home',
      path: '/',
    },
    {
      text: 'Conferences',
      path: '/conferences',
      ...(conferencesQuery.isSuccess && {
        items: conferencesQuery.data.map((conference) => ({
          path: `/conferences/${conference.id}`,
          text: conference.title,
        })),
      }),
    },
    {
      text: 'Upcoming Events',
      path: '/upcomingEvents',
      ...(eventsQuery.isSuccess && {
        items: eventsQuery.data.map((event) => ({
          path: `/events/${event.id}`,
          text: event.title,
        })),
      }),
    },
    {
      text: 'About',
      path: '/about',
    },
  ]

  const handleTabMouseEnter = (event: SyntheticEvent, index: number): void => {
    const tab = appBarTabsStructure[index]

    if (tab.items) {
      setAnchorElement(event.currentTarget)
      setTabMenu(tab.items)
    } else {
      setAnchorElement(null)
      setTabMenu([])
    }
  }

  const handleMenuClose = (): void => {
    setAnchorElement(null)
  }

  return (
    <Container maxWidth='lg'>
      <Box sx={{ display: 'flex' }} onMouseLeave={handleMenuClose}>
        {appBarTabsStructure.map((appBarTab, index) => (
          <AppBarTabLink
            key={index}
            component={RouterLink}
            to={appBarTab.path}
            onMouseEnter={(event): void => handleTabMouseEnter(event, index)}
          >
            {appBarTab.text}
          </AppBarTabLink>
        ))}

        <Popper open={!!anchorElement} anchorEl={anchorElement} onMouseLeave={handleMenuClose}>
          <Paper>
            <MenuList>
              {tabMenu.map((item) => (
                <MenuItem key={item.path} component={RouterLink} to={item.path} onClick={handleMenuClose}>
                  {item.text}
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </Popper>
      </Box>
    </Container>
  )
}
