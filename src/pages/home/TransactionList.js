import { useFirestore } from '../../hooks/useFirestore'

// styles
import styles from './Home.module.css'

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore('transactions')

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name} </p>
          <p className={styles.amount}>${transaction.amount}</p>
          <p className={styles.name}>{transaction.description}</p>
          <img src={transaction.imageUrl}  alt="image was not found" height="100px" width="100px"></img>
          <button onClick={() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}