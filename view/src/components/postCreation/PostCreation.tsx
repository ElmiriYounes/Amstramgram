import React, { useState, useEffect, useRef } from "react";
import Button from "../button/Button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  NewPostBox,
  NewPostBoxContainer,
  NewPostErrorDiv,
  NewPostForm,
  NewPostInput,
  NewPostInputLabel,
  NewPostMainContainer,
  NewPostTitle,
} from "./PostCreationStyles";
import addImage from "../../assets/images/misc/addImage.png";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import { useCookies } from "react-cookie";
import ErrorStatus from "../error404/ErrorStatus";
import { uri } from "../../variables/Variables";

const PostCreation = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const [localisation, setLocalisation] = useState<string>("");
  const [errorLocalisation, setErrorLocalisation] = useState<boolean>(false);
  const inputLocalisationRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [imageType, setImageType] = useState<string>("");
  const [errorImageInput, setErrorImageInput] = useState<boolean>(false);
  const [errStatus, setErrStatus] = useState<string>("");

  const handleChangeLocalisation = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setLocalisation(event.currentTarget.value);
  };

  const handleClick = async () => {
    if (localisation === "" || localisation == null) {
      console.log("Localisation missing");
      setErrorLocalisation(true);
      setSuccess("");
      setErrorMessage("Localisation is missing!");
    } else {
      console.log("localisation : " + localisation);
      setErrorLocalisation(false);
    }

    if (image === addImage || image === "" || image == null) {
      console.log("image is missing");
      setErrorImageInput(true);
      setSuccess("");
      setErrorMessage("Image is missing!");
    } else {
      setErrorImageInput(false);
    }

    if (localisation && image !== addImage && image !== "") {
      setErrorMessage("");
      setFetching(true);
      try {
        const response = await axios.post(
          `${uri}/posts/add`,
          {
            localisation,
            image,
            imageType,
          },
          {
            headers: { Authorization: `Bearer ${cookies["userToken"]}` },
          }
        );
        setSuccess(response.data);
        setImage(addImage);
        inputLocalisationRef.current!.value = "";
      } catch (error: any) {
        const status = error.response.status;
        status === "401"
          ? setErrStatus(String(status))
          : setErrorMessage("Error server, please try again");
      }
      setFetching(false);
    }
  };

  useEffect(() => {
    setImage(addImage);
  }, []);

  const inputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    var file = event.currentTarget.files?.item(0);
    var imageType = /image.*/;

    if (file?.type.match(imageType)) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function (event) {
        setImage(String(reader.result));
        setImageType(file!.type);
      };
    }
  };

  return (
    <>
      {errStatus !== "" ? (
        <ErrorStatus status={errStatus} />
      ) : (
        <NewPostMainContainer>
          <NavBar />
          <NewPostBoxContainer>
            <NewPostBox>
              <NewPostForm>
                <NewPostTitle>Create new post</NewPostTitle>
                <NewPostInputLabel haveError={errorImageInput ? true : false}>
                  <NewPostInput
                    type="file"
                    accept=".jpg, .jpeg, .png .webp"
                    id="imgInput"
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      inputChangeHandler(event);
                    }}
                  />
                  <img
                    src={image}
                    alt=""
                    draggable="false"
                    id="imgInputPreview"
                  />
                </NewPostInputLabel>
                <NewPostInput
                  ref={inputLocalisationRef}
                  placeholder="Localisation"
                  onChange={handleChangeLocalisation}
                  haveError={errorLocalisation ? true : false}
                />
                {(errorLocalisation ||
                  errorImageInput ||
                  success !== "" ||
                  errorMessage) && (
                  <NewPostErrorDiv success={success}>
                    {errorMessage}
                    {success}
                  </NewPostErrorDiv>
                )}
                <Button
                  text={
                    !fetching ? (
                      "Publish"
                    ) : (
                      <AiOutlineLoading3Quarters className="icon" />
                    )
                  }
                  onClick={handleClick}
                />
              </NewPostForm>
            </NewPostBox>
          </NewPostBoxContainer>
        </NewPostMainContainer>
      )}
    </>
  );
};

export default PostCreation;
