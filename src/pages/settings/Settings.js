import { Link } from "react-router-dom"
import styles from './Settings.module.css'

export default function Settings() { 
    return (
<div className={styles.container}>
    <div className={styles.content}>
      <h2> Settings</h2>
      <br></br>
            <li><Link to="/settings/updateinfo">Update Personal Information</Link></li>
            <br></br>
            <li><Link to="/">Temp Name 2</Link></li>
            <br></br>
            <li><Link to="/">Temp Name 3</Link></li>
  
        </div>
        </div>
    )
    
  }