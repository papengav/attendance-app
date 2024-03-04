import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './Pages/LoginForm/LoginForm';
import CreateUserDropdown from './Pages/CreateUserForm/CreateUserDropdown'
import NoPage from './Pages/NoPage'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<LoginForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/createUser" element={<CreateUserDropdown/>}/>
        <Route path = "*" element={<NoPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
