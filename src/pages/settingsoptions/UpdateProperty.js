import { useState } from 'react'
import { projectAuth, projectFirestore } from '../../firebase/config'
import { useDocument } from '../../hooks/useDocument'
import styles from './Settings.module.css'

export default function FetchData(){


    const [Amount, setAmount] = useState('')
    const [Description, setDescription] = useState('')
    const [Name, setName] = useState('')
   

    const { uid } = projectAuth.currentUser
    const { error, document } = useDocument('users', uid)
    
    if(error){
        return <div className="error">{error}</div>
    }
    if (!document){
        return <div className="loading">Loading...</div>
    }


    const updateUser = async (uid, updates) => {
        console.log("ENTERED FUNCTION")
        console.log(Amount)
        console.log(Description)
        await projectFirestore.collection("users").doc(uid).update(updates);
        const doc = await projectFirestore.collection("users").doc(uid).get();

    

        const user = {
            id: uid,
            Amount: setAmount,
            Description: setDescription,
            Name: setName,

        };
        console.log(user)
        return user
    };
    
    const handleSubmit = event => {
        //prevent page refresh
        event.preventDefault();
    
        console.log('form submitted');
      };

    return(      
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <h3>Update Property Information</h3>
                    <form onSubmit={handleSubmit}>
                    <label>Amount: </label>
                    <input
                        type="text"
                        name='Amount'
                        placeholder={document.Amount}
                        onChange = {(e) => setAmount(e.target.value)}
                    />
                    <br></br>
                    <label>Description: </label>
                    <input
                        type="text"
                        name='lastName'
                        placeholder={document.Description}
                        onChange = {(e) => setDescription(e.target.value)}
                    />     
                    <br></br>
                    <label>Name: </label>
                    <input
                        type="text"
                        name='address'
                        placeholder={document.address}
                        onChange = {(e) => setName(e.target.value)}
                    />
                    <br></br>
                   
                    </form>
                </div>
            </div>
        </div>
    );
}