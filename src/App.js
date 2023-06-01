import {Route, Routes} from 'react-router-dom';
import Home from './views/Home.jsx'
import Login from './views/Login.jsx'
import Signin from './views/Signin.jsx';
import Secret from './views/Secret.jsx';

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
