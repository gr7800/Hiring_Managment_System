import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/dream_jobing.png";
import { fetchUserProfile, logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { clearMessage } from "../redux/slices/jobSlice";
import { clearMessage as cleanIt } from "../redux/slices/authSlice";
import { resetApplicationDetails } from "../redux/slices/applicationSlice";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, auth, token } = useSelector((state) => state.auth);
  const role = user?.role || "Applicant";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && token) {
      dispatch(fetchUserProfile())
        .then((res) => {
          if (res?.payload === "Invalid token") {
            toast.warning(res?.payload);
            navigate("/login");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  }, [dispatch, navigate, token, user]);

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(cleanIt());
    dispatch(resetApplicationDetails());
    setDropdownOpen(false);
  }, [pathname]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-full bg-gray-100 flex justify-between items-center px-10 shadow-md shadow-[#1f84b9] fixed top-0 z-20 text-[#1f84b9] font-medium">
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="JobPortal Logo"
          className="max-w-[150px] max-h-[72px]"
        />
      </Link>

      <div className="relative min-w-[100px] flex justify-end">
        <CgProfile
          size={34}
          className={`cursor-pointer ${pathname === "/profile" && "text-[#1f84b9]"
            }`}
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-9 bg-gray-100 shadow-md shadow-[#1f84b9] rounded-md z-50">
            <ul className="flex flex-col">
              <li
                className={`${pathname === "/jobs" && "bg-[#1f84b9] text-white"
                  } `}
              >
                <Link
                  to="/jobs"
                  className={`block px-4 py-2 hover:bg-gray-200 transition-colors duration-200`}
                  onClick={() => setDropdownOpen(false)}
                >
                  Jobs
                </Link>
              </li>
              <li
                className={`${pathname === "/my-applications" && "bg-[#1f84b9] text-white"
                  } `}
              >
                <Link
                  to="/my-applications"
                  className={`block px-4 py-2 hover:bg-gray-200 transition-colors duration-200`}
                  onClick={() => setDropdownOpen(false)}
                >
                  Applications
                </Link>
              </li>
              <li
                className={`${pathname === "/profile" && "bg-[#1f84b9] text-white"
                  } `}
              >
                <Link
                  to="/profile"
                  className={`block px-4 py-2 hover:bg-gray-200 transition-colors duration-200`}
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
              </li>
              {token && user && (role === "HR" || role === "Manager") && (
                <li
                  className={`${pathname === "/hr/dashboard" && "bg-[#1f84b9] text-white"
                    } `}
                >
                  <Link
                    to="/hr/dashboard"
                    className={`block px-4 py-2 hover:bg-gray-200 transition-colors duration-200 text-nowrap whitespace-nowrap line-clamp-1`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    Hr Dashboard
                  </Link>
                </li>
              )}
              <li>
                {auth || token ? (
                  <p
                    onClick={handleLogout}
                    className={`block px-4 py-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer`}
                  >
                    Log out
                  </p>
                ) : (
                  <Link
                    to="/login"
                    className={`block px-4 py-2 hover:bg-gray-200 transition-colors duration-200 ${pathname === "/jobs" && "bg-[#1f84b9] text-white"
                      } `}
                    onClick={() => setDropdownOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
