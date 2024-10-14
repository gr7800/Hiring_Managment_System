import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/logo.png";
import { fetchUserProfile, logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, auth, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!user && token) {
      dispatch(fetchUserProfile()).then((res) => {
        if (res?.payload == "Invalid token") {
          toast.warning(res?.payload);
          navigate("/login")
        }
      }).catch((error) => {
        toast.error(error)
      })
    }
  }, [])

  return (
    <div className="w-full bg-gray-100 flex justify-between items-center px-10 shadow-md fixed top-0 z-20 text-gray-800 font-medium">
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="JobPortal Logo"
          className="hover:scale-105 transition-transform duration-200 max-w-[150px] max-h-[72px]"
        />
      </Link>

      <div className="block md:hidden ml-3 cursor-pointer" onClick={toggleMenu}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      <nav
        className={`fixed md:relative top-16 md:top-0 right-0 transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 z-50 shadow-md md:shadow-none md:flex-row md:gap-8`}
      >
        <ul className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center items-center p-5 md:p-0">
          <li>
            <Link
              to="/jobs"
              className={`hover:underline hover:text-blue-600 transition-colors duration-200 ${pathname === "/jobs" && "text-blue-600"}`}
              onClick={() => setIsOpen(false)}
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className={`hover:underline hover:text-blue-600 transition-colors duration-200 ${pathname === "/admin" && "text-blue-600"}`}
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </li>
          <li>
            {(auth || token) ? (
              <p
                onClick={() => dispatch(logout())}
                className={`hover:underline hover:text-blue-600 transition-colors duration-200 ${pathname === "/login" && "text-blue-600"}`}
              >
                Logout
              </p>
            ) : (<Link
              to="/login"
              className={`hover:underline hover:text-blue-600 transition-colors duration-200 ${pathname === "/login" && "text-blue-600"}`}
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>)
            }
          </li>
          <li>
            <Link
              to="/profile"
              className={`hover:underline hover:text-blue-600 transition-colors duration-200 ${pathname === "/profile" && "text-blue-600"}`}
              onClick={() => setIsOpen(false)}
            >
              <CgProfile size={24} />
            </Link>
          </li>
        </ul>
      </nav>
    </div >
  );
};

export default Navbar;
