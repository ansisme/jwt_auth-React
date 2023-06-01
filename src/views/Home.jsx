import React from 'react'
import {Link} from 'react-router-dom';
const Home = () => {
  return (
    <>
    <div>
        <h1>hey</h1>
        <Link to='/signup'>
        <button type='submit'>Signup</button>
        </Link>
        <Link to ='/login'><button type='submit'>Login</button></Link>
    </div>
    <div>
      <Link to='/secret'>
      <button>
      Secret
      </button></Link>
    </div>
    </>
  )
}

export default Home

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { requireAuth } from '../middleware/authMiddleware'; // Import the requireAuth middleware

// const Home = () => {
//   return (
//     <>
//       <div>
//         <h1>hey</h1>
//         <Link to="/signup">
//           <button type="submit">Signup</button>
//         </Link>
//         <Link to="/login">
//           <button type="submit">Login</button>
//         </Link>
//       </div>
//       <div>
//         <Link to="/secret">
//           <button>Secret</button>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default Home;

// // Wrap the Secret button with the requireAuth HOC
// export const Secret = requireAuth(Home);
