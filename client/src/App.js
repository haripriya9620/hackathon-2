import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import {BrowserRouter , Routes, Route , Link , Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Cartscreen from './screens/Cartscreen'
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Ordersscreen from './screens/Ordersscreen';
import Adminscreen from './screens/Adminscreen';
function App() {
  return (
    <div className="App">
       <Navbar/>

       <BrowserRouter>
        <Routes>
          {/* <Route path="/" exact component={Homescreen} /> */}
          <Route path="/" element={<Homescreen />} />
          <Route path="/cart" element={<Cartscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/orders" element={<Ordersscreen />} />
          <Route path="/admin" element={<Adminscreen />} />
          
          {/* <Route path="/cart" exact component={Cartscreen}/> */}
          {/* <Route path="/register" exact component={Registerscreen}/> */}
          {/* <Route path='/login' exact component={Loginscreen}/> */}
          {/* <Route path='/orders' exact component={Ordersscreen}/> */}
          {/* <Route path='/admin' component={Adminscreen}/> */}
        </Routes>       
       </BrowserRouter>
    
    </div>
  );
}

export default App;
