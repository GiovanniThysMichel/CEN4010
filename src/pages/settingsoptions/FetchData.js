import { useState } from 'react'
import { projectAuth, projectFirestore } from '../../firebase/config'
import { useDocument } from '../../hooks/useDocument'
import styles from './Settings.module.css'

export default function FetchData(){


    const [firstName, setfirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setSta] = useState('')
    const [zip, setZip] = useState('')
    

    const { uid } = projectAuth.currentUser
    const { error, document } = useDocument('users', uid)
    
    if(error){
        return <div className="error">{error}</div>
    }
    if (!document){
        return <div className="loading">Loading...</div>
    }


    const updateUser = async (uid, updates) => {
        

        await projectFirestore.collection("users").doc(uid).update(updates);
        const doc = await projectFirestore.collection("users").doc(uid).get();

        
        const user = {
            id: uid,
            firstName: setfirstName,
            LastName: setLastName,
            address: setAddress,
            city: setCity,
            state: setSta,
            zip: setZip

        };
        //console.log(user)
        console.log("BREAK")
        console.log(document)
        return user
    };

    function refreshPage() {
        window.location.reload(false);
      }
    

    
    const handleSubmit = event => {
        //prevent page refresh
        event.preventDefault();
        console.log('form submitted');
      };
      

    return(      
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <h3>Update Personal Information</h3>
                    <h4>(DONT LEAVE FIELDS BLANKS)</h4>
                    <form onSubmit={handleSubmit}>
                    <label>First Name: </label>
                    <input
                        type="text"
                        name='firstName'
                        placeholder={document.firstName}
                        onChange = {(e) => setfirstName(e.target.value)}
                        
                    />
                    <br></br>
                    <label>Last Name: </label>
                    <input
                        type="text"
                        name='lastName'
                        placeholder={document.LastName}
                        onChange = {(e) => setLastName(e.target.value)}
                       
                    />
                    <br></br>
                    <label>Address: </label>
                    <input
                        type="text"
                        name='address'
                        placeholder={document.address}
                        onChange = {(e) => setAddress(e.target.value)}
                        
                    />
                    <br></br>
                    <label>City: </label>
                    <input
                        type="text"
                        name='city'
                        placeholder={document.city}
                        onChange = {(e) => setCity(e.target.value)}
                        
                    />
                    <br></br>
                    <label>State: </label>
                    <input
                        type="text"
                        name='state'
                        placeholder={document.state}
                        onChange = {(e) => setSta(e.target.value)}
                        
                    />
                    <br></br>
                    <label>Zip Code: </label>
                    <input
                        type="text"
                        name='zip'
                        placeholder={document.zip}
                        onChange = {(e) => setZip(e.target.value)}
                        
                    />
                    <br></br>
                    <br></br>
                    <button 
                    onClick={()=>
                    updateUser(uid, {firstName, LastName, address, city, state, zip})
                    }> {"Update Info"} </button>
                    <br></br>
                    <br></br>
                    <button onClick={refreshPage}>Refresh Form</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
