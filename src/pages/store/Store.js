import { useState } from "react";
import { projectFirestore } from "../../firebase/config";
import styles from '../home/Home.module.css'


export default function Store(){

    const [allDocs, setAllDocs] = useState([]);

    function allTrans(){  
        projectFirestore.collection("transactions")
        .get()
        .then((snapshot)=>{
            if(snapshot.docs.length>0){
                snapshot.docs.forEach((doc) => {
                    setAllDocs((prev) => {
                        return[...prev,doc.data()];
                    });
                });
            }
        });
    }
        

    return(
        <div className={styles.container}>
            <div className={styles.content}>
            
            <h1>Welcome to the Store!</h1>
            <br></br>
            <button onClick={allTrans} className={styles}>View Store</button>
            <br></br>
            {allDocs.map((doc)=>{
                return(
                    <ul className={styles.transactions}>
                        <li>
                        <p className={styles.name}>{doc.name}</p>
                        <br></br>
                        <p className={styles.amount}>${doc.amount}</p>
                        <br></br>
                        </li>
                    </ul>
                    
                )
            })}

        
        
        </div>
        </div>
    )

}