import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'

// styles
import styles from './Navbar.module.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {
  
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>My Inventory</li>
        <img src={Temple} alt="dojo logo" />
        <span>The Inventory Management </span>
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/forgotpassword">ForgotPassword</Link></li>
          </>
        )}

        {user && (
          <>
            <li> Hello, {user.displayName}</li>
            <li>
              {!isPending && <button className="btn" onClick={logout}>Logout</button>}
              {isPending && <button className="btn" disabled>Logging out...</button>}
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
