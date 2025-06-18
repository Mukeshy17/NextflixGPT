import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { LOGIN_BG_URL, USER_AVATAR } from "../utils/constant";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // validation logic here
    setLoader(true);
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const nameValue = name?.current?.value;
    const message = checkValidateData(
      emailValue,
      passwordValue,
      isSignIn,
      nameValue
    );
    setErrorMessage(message);

    if (message) {
      setLoader(false); // Stop loading if validation fails
      return;
    }
    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameValue,
            photoURL:
              USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              

              // ...
            })
            .catch((error) => {
              // An error occurred
              (error);

              // ...
            })
            .finally(() => setLoader(false)); // Stop loading after profile update
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          setLoader(false); // Stop loading on error
        });
    } else {
      // Sign in logic here

      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        }).finally(() => setLoader(false)); // Stop loading after sign-in attempt
    }
  };
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="fixed inset-0">
        <img
        className="h-screen w-full md:h-full object-cover"
          src={LOGIN_BG_URL}
          alt="bg-image"
        />
      </div>
      <form className="w-5/6 md:w-3/12 absolute p-12 bg-black/80 rounded-lg my-24 mx-auto right-0 left-0 text-white">
        <h3 className="text-white text-3xl md:text-4xl pb-8 font-bold">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h3>
        {!isSignIn && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-sm"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-sm"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-sm"
        />
        <p className="text-red-700 font-bold text-md">{errorMessage}</p>
        <button
  onClick={handleFormSubmit}
  className="p-4 my-4 bg-red-700 w-full rounded-sm flex justify-center items-center"
  disabled={loader}
>
  {loader ? (
    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
  ) : (
    isSignIn ? "Sign In" : "Sign Up"
  )}
</button>

        <div className="flex items-center text-sm text-gray-400 mb-6">
          <input className="h-4 w-4 mr-2" type="checkBox" /> <span>Remeber Me</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span className="text-gray-400">
            {isSignIn ? "New to Netflix?" : "Already registered?"}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSignInForm();
            }}
            className="text-white font-bold cursor-pointer"
          >
            {isSignIn ? "Sign Up Now" : "Sign In Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
