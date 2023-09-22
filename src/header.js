import { Outlet, Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

export const Header = ({}) => {
  const theme = useTheme()

  return (
    <>
      <div>
        <header
          style={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: '20px 20vw',
          }}
        >
          <Link to='/'>Dropdown</Link>
          <Link to='/network'>Network</Link>
        </header>
        <Outlet />
      </div>
    </>
  )
}
