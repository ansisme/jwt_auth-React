import {Route, Routes} from 'react-router-dom';
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signin from './components/Signin.jsx';
import Secret from './components/Secret';

const App=() =>{
  return (
    <div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/secret' element={<Secret/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signin/>}/>
    </Routes>

      
    </div>
  );
}

export default App;
