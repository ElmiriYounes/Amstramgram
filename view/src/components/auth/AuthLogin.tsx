import React, { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "../button/Button";

import { AuthBox, AuthBoxContainer, AuthErrorDiv, AuthForm, AuthInput, AuthMainContainer, AuthPageText, AuthTitle } from "./AuthStyles";
import { useCookies } from "react-cookie";
import { uri } from "../../variables/Variables";

const AuthLogin: FC = () => {
  const [cookies, setCookie] = useCookies(["userToken"]);
  // Redirect
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorUsernameState, setErrorUsernameState] = useState<boolean>(false);
  const [errorPasswordState, setErrorPasswordState] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClick = async () => {
    if (password === "" || password == null) {
      setErrorPasswordState(true);
      setErrorMessage("Invalid password!");
    } else {
      setErrorPasswordState(false);
    }

    if (checkForSpecialChars(username) || username === "" || username == null) {
      setErrorUsernameState(true);
      setErrorMessage("Invalid username!");
    } else {
      setErrorUsernameState(false);
    }

    if (username && !checkForSpecialChars(username) && password) {
      setFetching(true);
      try {
        const response = await axios.post(`${uri}/auth/login`, {
          username,
          password,
        });
        setCookie("userToken", response.data, {
          path: "/",
          sameSite: "none",
          secure: true,
          maxAge: 3600,
        });
        
        window.location.hostname.substring(0,9) === "localhost" ? navigate('/') : navigate("/Amstramgram");
      } catch (error: any) {
        const status = error.response.status;
        status === 401
          ? setErrorMessage(error.response.data)
          : setErrorMessage("Error server, please try again!");
        console.log(error);
      }
      setFetching(false);
    }
  };

  const handleChangeUsername = (event: React.FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const handleChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const checkForSpecialChars = (str: string): boolean => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  };

  return (
    <AuthMainContainer>
      <AuthBoxContainer>
        <AuthBox>
          <AuthForm>
            <AuthTitle>Amstramgram</AuthTitle>
            <AuthInput
              placeholder="Username"
              onChange={handleChangeUsername}
              haveError={errorUsernameState ? true : false}
              disable={fetching ? true : false}
            />
            <AuthInput
              placeholder="Password"
              type="password"
              onChange={handleChangePassword}
              haveError={errorPasswordState ? true : false}
              disable={fetching ? true : false}
            />
            {(errorUsernameState || errorPasswordState || errorMessage) && (
              <AuthErrorDiv>{errorMessage}</AuthErrorDiv>
            )}
            <Button
              text={
                fetching ? (
                  <AiOutlineLoading3Quarters className="icon" />
                ) : (
                  "Login"
                )
              }
              onClick={handleClick}
            />
          </AuthForm>
        </AuthBox>
        <AuthBox>
          <AuthPageText>
            No account yet? <Link to={window.location.hostname.substring(0,9) === "localhost" ? '/register' : "/Amstramgram/register"}>sign up</Link>
          </AuthPageText>
        </AuthBox>
      </AuthBoxContainer>
    </AuthMainContainer>
  );
};

export default AuthLogin;