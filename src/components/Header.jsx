import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {
      });
   };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () =>  unsubscribe();
    
  }, []);

  const toggleSearchView = () => {
    dispatch(toggleGptSearchView());
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex items-center justify-between">
      <img
        className="w-44"
        src={
          LOGO_URL
        }
        alt="logo"
      />
      {user && (
        <div className="flex items-center justify-between">
          <button onClick={toggleSearchView} className="text-white px-3 py-1 bg-red-500 rounded-sm"> GPT Search</button>
          <h4 className="px-2 text-white">
            {user?.displayName?.split(" ")[0]}
          </h4>
          <img
            className="h-10 w-10 mx-2 rounded-sm"
            src={
              user?.photoURL}
            alt="Profile-img"
          />
          <button onClick={handleSignOut} className="font-bold text-red-600">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
