import { Route, Routes, useNavigate } from 'react-router-dom';


import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import SuccessPage from './pages/SuccessPage';


import PostsPage from './pages/PostsPage';
import AddCompanyPage from './pages/AddCompanyPage';
import ViewCompanyPage from './pages/ViewCompanyPage';

import UserDashBoard from './pages/UserDashBoard';
import { useSelector } from 'react-redux';

import AddPostPage from './pages/AddPostPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import RequestsPage from './pages/RequestsPage';


function App() {




  const email=useSelector((state)=>state.auth.email)
const role = useSelector((state)=>state.auth.role);// Replace this with the actual role value



  return (
    <div  >



      <Routes>
      <Route   path='/' element={<HomePage />} />

          <Route   path='login' element={<LoginPage />} />
          <Route path="Register" element={<RegisterPage />} />
          <Route path="Success" element={<SuccessPage />} />
       

        <Route path="/admin" element={<AdminPage />} >
          <Route index path='companies' element={<ViewCompanyPage />} />
          <Route path='add-company' element={<AddCompanyPage />} />
        </Route>
       

        <Route path="/user" element={<UserDashBoard />} >
          <Route index path='posts' element={<PostsPage />} />
          <Route index path='create-post' element={<AddPostPage />} />
          <Route index path='requests' element={<RequestsPage />} />
         
        </Route>
      





        <Route path='*' element={<p>Not Found</p>}></Route>



      </Routes>
    </div>
  );
}

export default App;