import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../Redux/Slice/authSlice";
import { useLogoutMutation } from "../Redux/Services/authServices";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../src/Assets/logo.png";

const links = [
  { name: "Home", linkto: "" },
  { name: "Training", linkto: "training" },
  {
    name: "Courses",
    linkto: "courses",
    submenu: [{ name: "Training Videos", linkto: "" }],
  },
  { name: "Certifications", linkto: "certifications" },

  {
    name: "Resources center",
    linkto: "resources",
    submenu: [
      { name: "Safety Manual Solutions", linkto: "" },
      { name: "Contractor Compliance Management", linkto: "" },
    ],
  },
  { name: "Contact", linkto: "contact" },
  { name: "Cart", linkto: "checkout", icon: <FaShoppingCart   style={{ height: "30px", width: "40px" }}/> },

  {
    name: "My Account",
    linkto: "dashboard",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const [showDropdown, setShowDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      dispatch(setUser(null));
      await logout();

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleMouseLeave = () => {
    console.log("handleMouseLeave");
    if (showDropdown && dropdownRef.current) {
      return;
    }
    setShowDropdown(null);
  };
  const handleMouseEnter = (linkName) => {
    console.log("handleMouseEnter", linkName);
    setShowDropdown(linkName);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prevValue) => !prevValue);
  };

  const handleDropdownMouseEnter = () => {
    console.log("handleDropdownMouseEnter");
    setShowDropdown((prevValue) => prevValue);
  };

  const handleDropdownMouseLeave = () => {
    setShowDropdown(null);
  };
  const handleMyAccountClick = (event) => {
    console.log(showPopup);
    setShowPopup(!showPopup);
    event.stopPropagation(); // Stop the event from propagating
  };

  const handleClickOutsidePopup = (event) => {
    const myAccountLink = document.querySelector(".my-account-link");
    const popup = document.querySelector(".popup-element");

    if (
      (!myAccountLink || !myAccountLink.contains(event.target)) &&
      (!popup || !popup.contains(event.target))
    ) {
      setShowPopup(false);
    }
  };

  const handlePopupToggle = (event) => {
    if (event) {
      event.stopPropagation();
      if (!showPopup) {
        setShowPopup(true);
        setIsMobileMenuOpen(false); // Close mobile menu when popup is toggled
      } else {
        setShowPopup(false);
      } // Stop the event from propagating
    }
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsidePopup);
    return () => {
      document.removeEventListener("click", handleClickOutsidePopup);
    };
  }, [showPopup]);

  const handleLogoutAndTogglePopup = () => {
    handleLogout();
    handlePopupToggle();
  };

  return (
    <div className="z-40 bg-white sticky top-0 h-14 px-16 py-10 w-full flex items-center justify-between">
      <div className="flex w-full items-center justify-between gap-8">
        <div>
          <img
            src={logo}
            style={{ height: "73px", width: "241px" }}
            onClick={() => navigate("/")}
            alt="Logo"
          />
        </div>
        <div className="lg:hidden ">
          <button
            onClick={handleMobileMenuToggle}
            className="text-black p-2 focus:outline-none -mr-24"
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div>
          <div
            className="hidden lg:flex justify-between items-center gap-5"
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
          >
            {links.map((link) => (
              <div
                key={link.name}
                className="font-bold text-black font-inter text-sm relative group "
                onMouseEnter={() => handleMouseEnter(link.name)}
              >
                {link.name === "My Account" ? (
                  user ? (
                    <Link
                      className="my-account-link bg-mains w-full font-bold px-8 rounded py-2 font-inter"
                      onClick={handleMyAccountClick}
                    >
                      {link.name}
                    </Link>
                  ) : null
                ) : (
                  <Link className="pointer" to={`/${link.linkto}`}>
                    {link.icon && <span className="mt-12">{link.icon}</span>}
                    {link.icon && !link.name && <span>{link.icon}</span>}
                    {link.name && !link.icon && <span>{link.name}</span>}
                  </Link>
                )}
                {link.submenu && showDropdown === link.name && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 space-y-2 w-60 bg-white"
                    onMouseEnter={() => handleDropdownMouseEnter()}
                    onMouseLeave={() => handleDropdownMouseLeave()}
                  >
                    {link.submenu.map((submenuLink) => (
                      <Link
                        key={submenuLink.name}
                        to={`/${link.linkto}/${submenuLink.linkto}`}
                        className="block px-4 py-2 transition duration-300 ease-in-out "
                      >
                        {submenuLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div>
              {!user && (
                <button
                  className="bg-mains w-full font-bold px-8 rounded-2xl py-2 font-inter"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isMobileMenuOpen && showPopup && (
        <div className="z-50 absolute top-16 right-8 mt-2 space-y-2 w-40 bg-white border popup-element">
          <Link
            to="/dashboard"
            onClick={(event) => handlePopupToggle(event)}
            className="block font-bold text-black font-inter text-sm px-4 py-2 transition duration-300 ease-in-out pointer"
          >
            Dashboard
          </Link>
          <button
            className="block text-sm font-bold px-4 rounded-2xl py-2 font-inter transition duration-300 ease-in-out pointer"
            onClick={handleLogoutAndTogglePopup}
          >
            Logout
          </button>
        </div>
      )}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-64 h-full bg-white z-40">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {links.map((link) => (
              <div
                key={link.name}
                className="font-bold text-black font-inter text-sm mb-4"
                onMouseEnter={() => handleMouseEnter(link.name)}
              >
                {link.name === "My Account" ? (
                  user ? (
                    <Link
                      className="my-account-link bg-mains w-full font-bold px-8 rounded-2xl py-2 font-inter"
                      onClick={handleMyAccountClick}
                    >
                      {link.name}
                    </Link>
                  ) : null
                ) : (
                  <Link to={`/${link.linkto}`}> {link.icon && <span className="mt-12">{link.icon}</span>}
                  {link.icon && !link.name && <span>{link.icon}</span>}
                  {link.name && !link.icon && <span>{link.name}</span>}x</Link>
                )}
                {link.submenu && showDropdown === link.name && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 space-y-1 w-70 bg-white"
                    onMouseEnter={() => handleDropdownMouseEnter()}
                    onMouseLeave={() => handleDropdownMouseLeave()}
                  >
                    {link.submenu.map((submenuLink) => (
                      <Link
                        key={submenuLink.name}
                        to={`/${link.linkto}/${submenuLink.linkto}`}
                        className="block   "
                      >
                        {submenuLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {!user && (
              <button
                className="bg-mains w-full font-bold px-8 rounded-2xl py-2 font-inter"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </div>
          {showPopup && (
            <div
              onClick={handlePopupToggle}
              className="z-50 absolute top-[600px] right-8 mt-2 space-y-2 w-40 bg-white border popup-element"
            >
              <Link
                to="/dashboard"
                onClick={(event) => handlePopupToggle(event)}
                className="block font-bold text-black font-inter text-sm px-4 py-2 transition duration-300 ease-in-out pointer"
              >
                Dashboard
              </Link>
              <button
                className="block text-sm font-bold px-4 rounded-2xl py-2 font-inter transition duration-300 ease-in-out pointer"
                onClick={handleLogoutAndTogglePopup}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
