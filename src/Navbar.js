import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useAuth} from "./account/Authentication";

const Navbar = () => {
  const {isLoggedIn, user} = useAuth();

  return (
      <nav className="bg-gray-200 p-1">
        <div className="text-xl font-semibold flex justify-end space-x-3 underline">
          <div>
            {isLoggedIn ? UserDropDown(user) :
                <Link to="/login"> Login </Link>}
          </div>
        </div>
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
              <Link to='/collection/add'
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-700">
                Add Collection
              </Link>
              <Link to='/logout'
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-700">
                Logout
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