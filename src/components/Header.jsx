import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { customStyles, langConst, LOGO_URL } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import Select from "react-select";
import { changeLanguage } from "../utils/configSlice";
import { Menu, X } from "lucide-react"; // Hamburger icons

const Header = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).catch((error) => {});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleSearchView = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (option) => {
    dispatch(changeLanguage(option.value));
    setSelectedOption(option);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="absolute w-screen px-4 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row items-center justify-between">
      {/* Top Row: Logo + Hamburger */}
      <div className="w-full flex items-center justify-between">
        <img className="w-36 sm:w-44" src={LOGO_URL} alt="logo" />

        {/* Hamburger Button */}
        {user && (
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {user && isMenuOpen && (
        <div className="md:hidden mt-4 w-full bg-black flex flex-col items-start gap-4 text-sm">
          {showGptSearch && (
            <div className="w-full">
              <Select
                classNamePrefix="custom-select"
                value={selectedOption}
                onChange={handleLanguageChange}
                options={langConst}
                placeholder="Select"
                styles={customStyles}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary25: "#4b5563",
                    primary: "#6b7280",
                    neutral0: "#1f2937",
                    neutral80: "white",
                    neutral20: "#4b5563",
                  },
                })}
              />
            </div>
          )}
          <button
            onClick={toggleSearchView}
            className="text-white px-3 py-1 bg-red-500 rounded-sm w-full"
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>

          <div className="flex items-center gap-3">
            {/* <h4 className="text-white font-medium">{user?.displayName?.split(" ")[0]}</h4> */}
            {/* <img className="h-9 w-9 rounded-sm" src={user?.photoURL} alt="Profile" /> */}
          </div>

          <button onClick={handleSignOut} className="font-bold text-xl mb-6 text-red-600">
            (Sign Out)
          </button>
        </div>
      )}

      {/* Desktop Menu */}
      {user && (
        <div className="hidden md:flex items-center gap-4">
          {showGptSearch && (
            <div className="w-32">
              <Select
                classNamePrefix="custom-select"
                value={selectedOption}
                onChange={handleLanguageChange}
                options={langConst}
                placeholder="Select"
                styles={customStyles}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary25: "#4b5563",
                    primary: "#6b7280",
                    neutral0: "#1f2937",
                    neutral80: "white",
                    neutral20: "#4b5563",
                  },
                })}
              />
            </div>
          )}

          <button
            onClick={toggleSearchView}
            className="text-white px-3 py-1 bg-red-500 rounded-sm w-38"
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>

          {/* <h4 className="text-white font-medium">{user?.displayName?.split(" ")[0]}</h4> */}
          <img className="h-9 w-9 rounded-sm" src={user?.photoURL} alt="Profile" />
          <button onClick={handleSignOut} className="font-bold w-28 text-red-600">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
