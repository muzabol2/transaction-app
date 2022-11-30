import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';

function App() {
   return (
      <div>
         <BrowserRouter>
            <Navbar />
            <Routes>
               <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
         </BrowserRouter>
      </div>
   );
}

export default App;
