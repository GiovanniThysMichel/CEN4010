import { projectAuth } from '../../firebase/config'
import { useDocument } from '../../hooks/useDocument'
import styles from './Settings.module.css'

export default function FetchData(){
    const { uid } = projectAuth.currentUser
    const { error, document } = useDocument('users', uid)

    console.log(uid)
    
    if(error){
        return <div className="error">{error}</div>
    }
    if (!document){
        return <div className="loading">Loading...</div>
    }

    

    return(
       
        
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <h3>Update Personal Information</h3>
                    <form>
                    <label>Display Name: </label>
                    <input
                        type="text"
                        placeholder={document.displayName}
                    />
                    <br></br>
                    <label>First Name: </label>
                    <input
                        type="text"
                        placeholder={document.firstName}
                    />
                    <br></br>
                    <label>Last Name: </label>
                    <input
                        type="text"
                        placeholder={document.LastName}
                    />
                    <br></br>
                    <label>DOB: </label>
                    <input
                        type="date"
                        placeholder={document.dob}
                    />
                    <br></br>
                    <button>{"Update Info"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
