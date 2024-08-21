import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./account/Login";
import {AuthProvider} from "./account/Authentication";

import "./App.css"
import Signup from "./account/Signup";

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
