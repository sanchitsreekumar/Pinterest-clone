import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {FaPinterest} from 'react-icons/fa'
import Pinter from '../assets/Pinter.png';
import takingPics from '../assets/takingPics.mp4'

import { motion } from "framer-motion";



import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    // console.log(response);
    // saving the user info inthe localstorage for future access
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    // console.log(response.profileObj);

    const { imageUrl, name, googleId } = response.profileObj;

    // saving the user detail to sanity
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    // create a client file to acces the sanity db
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  // login contianer
  return (
    <motion.div 
    className="flex justify-start items-center flex-col h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.5 }}
      >
      <div className="relative w-full h-full">
        {/* login screen video */}
        <video
          src={takingPics}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>

      {/* overlay for the video */}
      <div className="absolute flex-col flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
        {/* login content */}

        {/* logo */}
        <div className="p-5">
          <img src={Pinter} alt="" className="h-20" />
        </div>

        {/* login Button */}
        <div className="shadow-2xl">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_TOKEN}
            render={(renderProps) => (
              <button
                type="button"
                className="bg-mainColor flex justify-center items-center p-2 rounded-lg cursor-pointer outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="mr-4" /> Sign in with Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Login;