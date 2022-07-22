import { useState } from 'react'
import { useAddInfo } from '../../hooks/useAddInfo'

// styles
import styles from './AddInfo.module.css'

export default function AddInfo() {
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Age, setAge] = useState('')
    const [ZipCode, setZipCode] = useState('')
    const [RoomID, setRoomID] = useState('')
    const { AddInfo, isPending, error } = useAddInfo()

  const handleSubmit = (e) => {
    e.preventDefault()
    AddInfo(FirstName, LastName, Age, ZipCode, RoomID)
  }

  return (
    <form onSubmit={handleSubmit} className={styles['AddInfo-form']}>
      <h2>Additional Info</h2>
      <label>
        <span>First Name:</span>
        <input
          required 
          type="FirstName" 
          onChange={(e) => setFirstName(e.target.value)} 
          value={FirstName}
        />
      </label>
      <label>
        <span>Last Name:</span>
        <input
          required
          type="LastName" 
          onChange={(e) => setLastName(e.target.value)} 
          value={LastName}
        />
      </label>
      <label>
        <span>Age:</span>
        <input
          required
          type="Age" 
          onChange={(e) => setAge(e.target.value)} 
          value={Age}
        />
      </label>
      <label>
        <span>ZipCode:</span>
        <input
          required
          type="ZipCode" 
          onChange={(e) => setZipCode(e.target.value)} 
          value={ZipCode}
        />
      </label>
      <label>
        <span>Set Room ID:</span>
        <input 
          required
          type="SetRoomID"
          onChange={(e) => setRoomID(e.target.value)} 
          value={RoomID}
        />
      </label>
      {!isPending && <button className="btn">Add Info</button>}
      {isPending && <button className="btn" disabled>loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}