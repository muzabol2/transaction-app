import bank_logo from '../assets/bank_logo.png';

export default function Navbar() {
   return (
      <nav className='navbar'>
         <ul>
            <li>
               <img src={bank_logo} alt="bank logo" height='50px' />
            </li>
         </ul>
      </nav>
   );
}
