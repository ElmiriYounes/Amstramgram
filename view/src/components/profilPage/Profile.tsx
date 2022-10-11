import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import NavBar from "../navbar/NavBar";
import { useCookies } from "react-cookie";
import { RiDeleteBin6Line } from "react-icons/ri";
import avatarTemplate from "../../assets/images/misc/avatar.png";
import {
  ProfilMainContainer,
  ProfilDescription,
  ProfilImg,
  ButtonContainer,
  ImgContainer,
  ProfilContent,
  MyPostsContainer,
  Container,
  ModalDeleteWrap,
  ModalDelete,
} from "./ProfileStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import { Fetching, PostCard, PostsWrapper, User } from "../home/HomeCompStyles";
import { BiUserCircle } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import ErrorStatus from "../error404/ErrorStatus";
import { CgClose } from "react-icons/cg";
import { uri } from "../../variables/Variables";

const Profil = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [empty, setEmpty] = useState<string>("");
  const [msgDelete, setMsgDelete] = useState<string>("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const getPosts = async () => {
    setFetching(true);
    try {
      const response = await axios.get(
        `${uri}/posts/getMyPosts`,
        {
          headers: { Authorization: `Bearer ${cookies["userToken"]}` },
        }
      );
      setPosts(response.data);
      response.data.length === 0 && setEmpty("No results yet");
    } catch (error: any) {
      setFetching(false);
      setError(error.response.data);
      console.error(error);
    }
    setFetching(false);
  };
  useEffect(() => {
    const getAvatar = async () => {
      try {
        const response = await axios.get(
          `${uri}/users/getMyAvatar`,
          {
            headers: { Authorization: `Bearer ${cookies["userToken"]}` },
          }
        );
        setAvatar(response.data);
      } catch (error: any) {
        setError(error.response.data);
        console.error(error);
      }
    };
    

    getPosts();
    getAvatar();
  }, []);

  const handleClick = () => {
    removeCookie("userToken", { path: "/", sameSite: "none", secure: true });
    window.location.hostname.substring(0,9) === "localhost" ? navigate('/') : navigate("/Amstramgram/");
  };

  const handleClickEdit = () => {
    window.location.hostname.substring(0,9) === "localhost" ? navigate('/editProfile') : navigate("/Amstramgram/editProfile");
  };

  const handleDelete = async (_id: number) => {
    setFetching(true);
    try {
      const response = await axios.post(
        `${uri}/posts/deletePost`,
        { id: _id },
        {
          headers: { Authorization: `Bearer ${cookies["userToken"]}` },
        }
      );
      console.log(response.data);
      setMsgDelete(response.data);
      setFetching(false);
      getPosts();
    } catch (error: any) {
      setFetching(false);
      setError(error.response.data);
      console.error(error);
    }
  };

  return (
    <ProfilMainContainer>
      {msgDelete !== "" ? (
        <ModalDeleteWrap>
          <ModalDelete>
            {msgDelete}
            <CgClose
              className="close"
              onClick={() => {
                setMsgDelete("");
              }}
            />
          </ModalDelete>
        </ModalDeleteWrap>
      ) : null}
      <Container>
        <NavBar />
        <ImgContainer>
          <ProfilImg>
            <img
              className="avatar"
              src={avatar ? avatar : avatarTemplate}
              alt="avatar"
            />
          </ProfilImg>
        </ImgContainer>
        <ProfilContent>
          <ProfilDescription>
            {/* <h2>Hello</h2>
            <p>I'm a man... yes a man </p> */}
          </ProfilDescription>
          <ButtonContainer>
            <Button onClick={handleClick} text="Logout" />
            <Button onClick={handleClickEdit} text="Edit Profile" />
          </ButtonContainer>
        </ProfilContent>
      </Container>
      {fetching ? (
        <Fetching calcHeight="500px">
          <span>Loading</span>
          <div>
            <FaCircle className="circle" />
            <FaCircle className="circle" />
            <FaCircle className="circle" />
            <FaCircle className="circle" />
            <FaCircle className="circle" />
          </div>
        </Fetching>
      ) : error !== "" ? (
        <ErrorStatus status={error} />
      ) : (
        <PostsWrapper>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <PostCard key={index} delayAnimation={index * 0.1}>
                <img src={post.img.data} alt="" />
                <User>
                  <BiUserCircle className="iconUser" />
                  <div className="user_localisation">
                    <span>{post.username}</span>
                    <span>{post.localisation}</span>
                  </div>
                </User>
                <RiDeleteBin6Line
                  className="delete"
                  onClick={() => {
                    handleDelete(post._id);
                  }}
                />
              </PostCard>
            ))
          ) : (
            <h2>{empty}</h2>
          )}
        </PostsWrapper>
      )}
    </ProfilMainContainer>
  );
};

export default Profil;
