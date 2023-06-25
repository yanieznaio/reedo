
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './compenents/auth/Login';
import Register from './compenents/auth/Register';
import RequireAuth from './compenents/auth/RequireAuth';
import UserHome from './compenents/Profile/UserHome';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* publiec route */}
    
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>



        {/* private route */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]}/> }>
            <Route path='/' element={<UserHome/>}/>
         
 
          </Route>

     

      </Route>
    </Routes>
  );
}

export default App;
