import React from "react";
import { NavBarMainContainer, NavBarTitle, NewPostIconContainer } from "./NavBarStyles";
import { AiFillHome } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  let navigate = useNavigate();

  const homeClickHandler = () => {
    console.log("home");
    window.location.hostname.substring(0,9) === "localhost" ? navigate('/') : navigate("/Amstramgram");
  }

  const newPostClickHandler = () => {
    console.log("new post");
    window.location.hostname.substring(0,9) === "localhost" ? navigate('/newPost') : navigate("/Amstramgram/newPost");
  }

  const profileClickHandler = () => {
    console.log("profile");
    window.location.hostname.substring(0,9) === "localhost" ? navigate('/profile') : navigate("/Amstramgram/profile");
  }

  return (
    <NavBarMainContainer>
      <IconContext.Provider value={{size:"1.25em"}}>
        <NavBarTitle onClick={homeClickHandler}>Amstramgram</NavBarTitle>
        <div className="iconsItems">

        <div className="HomeIcon" onClick={homeClickHandler}>
          <AiFillHome />
          <div className="HomeText">Home</div>
        </div>
        <NewPostIconContainer>
          <div className="NewPostIcon" onClick={newPostClickHandler}>
            <BsPlusLg />
            <div className="PostText">Post</div>
          </div>
        </NewPostIconContainer>
        <div className="ProfileIcon" onClick={profileClickHandler}>
          <FaUser />
          <div className="ProfileText">Profile</div>
        </div>
        </div>
      </IconContext.Provider>
    </NavBarMainContainer>
  );
};

export default NavBar;
