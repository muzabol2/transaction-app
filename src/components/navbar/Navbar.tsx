import bank_logo from '../../assets/bank_logo.png';
import styles from './Navbar.module.css';

export default function Navbar() {
   return (
      <nav className={styles.navbar}>
         <ul>
            <li>
               <img src={bank_logo} alt="bank logo" />
            </li>
         </ul>
      </nav>
   );
}
