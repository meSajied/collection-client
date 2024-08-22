import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./account/Login";
import {AuthProvider} from "./account/Authentication";

import "./App.css"
import Signup from "./account/Signup";
import {Logout} from "./account/Logout";
import {Dashboard} from "./pages/Dashboard";
import {MyCollections} from "./pages/MyCollections";
import CollectionPage from "./pages/CollectionPage";

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/collection/id/:id" element={<CollectionPage />} />
            {/*<Route path="/category/:id" element={<Logout />} />*/}
            <Route path="/collection/user/:username" element={<MyCollections />} />
            {/*<Route path="/admin" element={<Logout />} />*/}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
