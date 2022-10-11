import React, { useState, useEffect } from "react";
import NavBar from "../navbar/NavBar";
import {
  Fetching,
  HomeMainContainer,
  PostCard,
  PostsWrapper,
  User,
} from "./HomeCompStyles";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FiLoader } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import ErrorStatus from "../error404/ErrorStatus";
import { uri } from "../../variables/Variables";

const HomeComp = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const [posts, setPosts] = useState<any[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [empty, setEmpty] = useState<string>("");

  useEffect(() => {
    const getPosts = async () => {
      setFetching(true);
      try {
        const response = await axios.get(`${uri}/posts/getAll`, {
          headers: { Authorization: `Bearer ${cookies["userToken"]}` },
        });
        setPosts(response.data);
        response.data.length === 0 && setEmpty("No results yet");
      } catch (error: any) {
        setFetching(false);
        setError(String(error.response.status));
        // console.error(error);
      }
      setFetching(false);
    };

    getPosts();
  }, []);

  return (
    <HomeMainContainer>
      <NavBar />
      {fetching ? (
        <Fetching calcHeight="56px">
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
              <PostCard key={index} delayAnimation={index * .1}>
                <img src={post.img.data} alt="" />
                <User>
                  <BiUserCircle className="iconUser" />
                  <div className="user_localisation">
                    <span>{post.username}</span>
                    <span>{post.localisation}</span>
                  </div>
                </User>
              </PostCard>
            ))
          ) : (
            <h2>{empty}</h2>
          )}
        </PostsWrapper>
      )}
    </HomeMainContainer>
  );
};

export default HomeComp;
