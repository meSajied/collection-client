import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useAuth} from "./account/Authentication";

const Navbar = () => {
  const {isLoggedIn, user} = useAuth();

  return (
      <nav className="bg-gray-200 p-1 flex justify-end border-1">
        {isLoggedIn ? UserDropDown(user) :
            <Link to="/login" className="text-xl border font-semibold underline"> Login </Link>}
      </nav>
  )
}

function UserDropDown(name) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
      <div>
        <button className="text-xl border font-semibold" onClick={toggleDropdown}>
          {name.username}
        </button>

        {isDropdownOpen && (
            <div className="absolute mt-2 space-y-2 bg-white border rounded-md shadow-lg">
              <Link to={`/collection/user/${name.username}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-700">
                My Collection
              </Link>
              {name.authorities === "[ROLE_ADMIN]"? <Link to="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-700">
                Admin Panel</Link>:null}
            </div>
        )}
      </div>
  )
}
export {Navbar};