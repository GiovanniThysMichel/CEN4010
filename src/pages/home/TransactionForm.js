import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import {projectStorage} from '../../firebase/config'
export default function TransactionForm({ uid }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const { addDocument, response } = useFirestore('transactions')
 const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState('')
    const handleImageAsFile = (e) => {
      const image = e.target.files[0]
      setImageAsFile(imageAsFile => (image))
      console.log(imageAsFile)
  }

  const handleFireBaseUpload = e => {
    e.preventDefault()

  console.log('start of upload')
  // async magic goes here...
  if(imageAsFile === '') {
    console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
  }
  const uploadTask = projectStorage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
  //initiates the firebase side uploading 
  uploadTask.on('state_changed', 
  (snapShot) => {
    //takes a snap shot of the process as it is happening
    console.log(snapShot)
  }, (err) => {
    //catches the errors
    console.log(err)
  }, () => {
    // gets the functions from projectStorage refences the image projectStorage in firebase by the children
    // gets the download url then sets the image from firebase as the value for the imgUrl key:
    projectStorage.ref('images').child(imageAsFile.name).getDownloadURL()
     .then(fireBaseUrl => {
      const data = fireBaseUrl;
      console.log(data)
       setImageAsUrl(data)
       console.log(imageAsUrl)
       handleSubmit(e,data)
     })
  })
  }

  const handleSubmit = async (e,imagePath) => {
    
    addDocument({
      uid, 
      name, 
      amount,
      description,
      imageUrl:imagePath,
    }).then(data=>console.log(data)).catch(e=>console.log(e))
  }

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('')
      setAmount('')
      setDescription('')
    }
  }, [response.success])

  return (
    <>
      <h3>Add a Item</h3>
      {/* handleSubmit */}
      {/* handleFireBaseUpload */}
      <form onSubmit={handleFireBaseUpload}>
        <label>
          <span>Item name:</span>
          <input 
            type="text"
            required
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
        </label>
        <label>
          <span>Item Description:</span>
          <input 
            type="text"
            required
            onChange={(e) => setDescription(e.target.value)} 
            value={description} 
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)} 
            value={amount} 
          />
        </label>
        <input 
   type="file"  
   onChange={handleImageAsFile}
 />


        <button>Add To Inventory</button>
      </form>
    </>
  )
}