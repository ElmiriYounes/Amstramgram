import React, { FC, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ErrorWrap } from "./ErrorStatusStyle";
import { useCookies } from "react-cookie";

interface IError {
  status: string;
}

const ErrorStatus: FC<IError> = (props) => {
  const navigate = useNavigate();
  const [clear, setClear] = useState<number>();
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);

  useEffect(() => {
    setTimeout(() => {
      props.status !== "404" && removeCookie("userToken", { path: "/", sameSite: "none", secure: true });
      window.location.hostname.substring(0,9) === "localhost" ? navigate('/') : navigate("/Amstramgram");
    }, 5000);
  }, []);

  return (
    <ErrorWrap>
      <div>
        {props.status === "404"
          ? "Error 404: Page not found"
          : props.status === "401"
          ? "Unautorized"
          : "Problem server"}
        , you will redirect to login page after few secondes...
      </div>
    </ErrorWrap>
  );
};

export default ErrorStatus;
