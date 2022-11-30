import styles from './Footer.module.css';

export default function Footer() {
   return (
      <footer className={styles.footer}>
         <ul>
            <li>Ochrona danych</li>
            <li>Zastrzeżenia prawne</li>
            <li>BIC (Swift): BIGBPLPWXXX</li>
            <li>{"Copyright © BM ;)"}</li>
         </ul>
      </footer>
   );
}
