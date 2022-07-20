import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

import styles from './Settings.module.css'

export default function Update() { 
    return (
<div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.sidebar}>
        <h3>Update Personal Information</h3>
        <form>
          <label>First Name</label>
          <input
            type="text"
          />
          <br></br>
          <label>Last Name</label>
          <input
            type="text"
          />
          <br></br>
          <label>Age</label>
          <input
            type="number"
          />
          <br></br>
          <label>Zip Code</label>
          <input
            type="number"
          />
          <br></br>
          <label>Room Number</label>
          <input
            type="number"
          />
          <br></br>
          <button>{"Update Info"}</button>
        </form>
        </div>
        </div>
        </div>
    )
    
  }