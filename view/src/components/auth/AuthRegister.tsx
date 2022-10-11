import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "../button/Button";

import { AuthBox, AuthBoxContainer, AuthErrorDiv, AuthForm, AuthInput, AuthMainContainer, AuthPageText, AuthTitle } from "./AuthStyles";
import { useCookies } from "react-cookie";
import { uri } from "../../variables/Variables";

const AuthRegister: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  // Redirect
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [errorUsernameState, setErrorUsernameState] = useState<boolean>(false);
  const [errorPasswordState, setErrorPasswordState] = useState<boolean>(false);
  const [errorPasswordConfirmState, setErrorPasswordConfirmState] =
    useState<boolean>(false);
  const [errorIdenticalPassword, setErrorIdenticalPassword] =
    useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [registered, setRegistered] = useState<boolean>(false);

  useEffect(() => {
    cookies.userToken &&
      removeCookie("userToken", { path: "/", sameSite: "none", secure: true });
  }, []);

  const handleClick = async () => {
    registered && setRegistered(c => !c)
    if (password !== passwordConfirm) {
      setErrorIdenticalPassword(true);
      setErrorMessage("Password and confirmation must be the same!");
    } else {
      setErrorIdenticalPassword(false);
    }

    if (passwordConfirm === "" || passwordConfirm == null) {
      // console.log('invalid password confirm');
      setErrorPasswordConfirmState(true);
      setErrorMessage("Invalid password confirmation!");
    } else {
      // console.log('password confirm : ' + passwordConfirm);
      setErrorPasswordConfirmState(false);
    }

    if (password === "" || password == null) {
      // console.log('invalid password');
      setErrorPasswordState(true);
      setErrorMessage("Invalid password!");
    } else {
      // console.log('password : ' + password);
      setErrorPasswordState(false);
    }

    if (checkForSpecialChars(username) || username === "" || username == null) {
      // console.log('invalid username');
      setErrorUsernameState(true);
      setErrorMessage("Invalid username!");
    } else {
      // console.log('username : ' + username);
      setErrorUsernameState(false);
    }

    if (
      !checkForSpecialChars(username) &&
      username &&
      password &&
      passwordConfirm &&
      password === passwordConfirm
    ) {
      setFetching(true);
      try {
        const response = await axios.post(
          `${uri}/users/register`,
          {
            username,
            password,
          }
        );
        setRegistered(c => true)
        setErrorMessage(response.data);
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

  const handleChangePasswordConfirm = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.currentTarget.value);
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
            <AuthInput
              placeholder="Confirm Password"
              type="password"
              onChange={handleChangePasswordConfirm}
              haveError={errorPasswordConfirmState ? true : false}
              disable={fetching ? true : false}
            />
            {(errorUsernameState ||
              errorPasswordState ||
              errorPasswordConfirmState ||
              errorIdenticalPassword ||
              errorMessage) && <AuthErrorDiv success={registered}>{errorMessage}</AuthErrorDiv>}
            <Button
              text={
                fetching ? (
                  <AiOutlineLoading3Quarters className="icon" />
                ) : (
                  "Register"
                )
              }
              onClick={handleClick}
            />
          </AuthForm>
        </AuthBox>
        <AuthBox>
          <AuthPageText>
            Already an account? <Link to={window.location.hostname.substring(0,9) === "localhost" ? '/' : "/Amstramgram/"}>sign in</Link>
          </AuthPageText>
        </AuthBox>
      </AuthBoxContainer>
    </AuthMainContainer>
  );
};

export default AuthRegister;
