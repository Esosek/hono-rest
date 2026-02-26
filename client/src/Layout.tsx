import { NavLink, Outlet } from 'react-router'

export const Layout = () => {
  return (
    <div className='p-8 max-w-xl mx-auto text-center'>
      <header>
        <nav className='gap-8'>
          <NavLink to='/'>Sets</NavLink>
          <NavLink to='/cards'>Cards</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
