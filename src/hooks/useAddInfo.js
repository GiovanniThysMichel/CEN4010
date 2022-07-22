import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useAddInfo = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const AddInfo = async (FirstName, LastName, Age, ZipCode, RoomID) => {
    setError(null)
    setIsPending(true)
  
    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(FirstName, LastName, Age, ZipCode, RoomID)
      
      // update online status
      const documentRef = projectFirestore.collection('users').doc(res.user.uid)
      await documentRef.update({ online: true })
      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { AddInfo, isPending, error }
}
