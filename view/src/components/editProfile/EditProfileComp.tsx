import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import axios from "axios";
import avatarTemplate from "../../assets/images/misc/avatar.png";
import {
  EditProfileBox,
  EditProfileBoxContainer,
  EditProfileEditBtn,
  EditProfileEditContainer,
  EditProfileForm,
  EditProfileInput,
  EditProfileMainContainer,
  EditProfileTitle,
  AvatarWrap,
  ModalDelete,
} from "./EditProfileCompStyles";
import { AiFillEdit, AiOutlineLoading3Quarters } from "react-icons/ai";
import BackDrop from "../modals/BackDrop";
import ChangeUsernameModal from "../modals/ChangeUsernameModal";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import { useCookies } from "react-cookie";
import ErrorStatus from "../error404/ErrorStatus";
import { ImgContainer, ProfilImg } from "../profilPage/ProfileStyle";
import { uri } from "../../variables/Variables";

const EditProfileComp: FC = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [usernameModalIsOpen, setUsernameModalIsOpen] = useState(false);
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [errStatus, setErrStatus] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [fetchingDelete, setFetchingDelete] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const getUsername = async () => {
    try {
      const resp = await axios.get(
        `${uri}/users/getMyUsername`,
        {
          headers: { Authorization: `Bearer ${cookies["userToken"]}` },
        }
      );
      setUsername(resp.data);
    } catch (error: any) {
      const status = error.response.status;
      setErrStatus(String(status));
      console.log(error);
    }
  };
  const getAvatar = async () => {
    try {
      const response = await axios.get(
        `${uri}/users/getMyAvatar`,
        {
          headers: { Authorization: `Bearer ${cookies["userToken"]}` },
        }
      );
      setAvatar(response.data);
      setFetching(false);
    } catch (error: any) {
      // setError(error.response.data);
      console.error(error);
    }
  };
  useEffect(() => {
    getAvatar();
    getUsername();
  }, []);

  const handleClickBackBtn = () => {
    window.location.hostname.substring(0,9) === "localhost" ? navigate('/profile') : navigate("/Amstramgram/profile");
  };

  const handleClickBackDrop = () => {
    setModalIsOpen(false);
    setUsernameModalIsOpen(false);
    setPasswordModalIsOpen(false);
  };

  const handleClickChangeUsername = () => {
    setModalIsOpen(true);
    setUsernameModalIsOpen(true);
  };

  const handleClickChangePassword = () => {
    setModalIsOpen(true);
    setPasswordModalIsOpen(true);
  };

  const inputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    var file = event.currentTarget.files?.item(0);
    var imageType = /image.*/;

    if (file?.type.match(imageType)) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async function (event) {
        try {
          setFetching(true);
          const resp = await axios.post(
            `${uri}/users/update`,
            { target: "avatar", value: reader.result },
            {
              headers: { Authorization: `Bearer ${cookies["userToken"]}` },
            }
          );
          console.log(cookies["userToken"]);
          getAvatar();
          setMsg(resp.data.msg);
        } catch (error: any) {
          const status = error.response.status;
          setErrStatus(String(status));
        }
      };
    }
  };

  const handleDeleteUser = async () => {
    try {
      setFetchingDelete(true);
      const resp = await axios.delete(
        `${uri}/users/deleteUser`,
        {
          headers: { Authorization: `Bearer ${cookies["userToken"]}` },
        }
      );
      console.log(resp.data);
      removeCookie("userToken", { path: "/", sameSite: "none", secure: true });
      window.location.hostname.substring(0,9) === "localhost" ? navigate('/') : navigate("/Amstramgram/");
    } catch (error: any) {
      const status = error.response.status;
      setErrStatus(String(status));
    }
  };

  return (
    <>
      {errStatus !== "" ? (
        <ErrorStatus status={errStatus} />
      ) : (
        <EditProfileMainContainer>
          {openDelete && (
            <ModalDelete>
              {fetchingDelete ? (
                <AiOutlineLoading3Quarters className="icon" />
              ) : (
                <div>
                  Are you sure to delete your account?
                  <div>
                    <button onClick={handleDeleteUser}>Yes</button>
                    <button
                      onClick={() => {
                        setOpenDelete(false);
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </ModalDelete>
          )}
          <EditProfileBoxContainer>
            <EditProfileBox>
              <EditProfileForm>
                <EditProfileTitle>Edit profile</EditProfileTitle>
                <ImgContainer>
                  <ProfilImg>
                    {fetching ? (
                      <Button
                        text={<AiOutlineLoading3Quarters className="icon" />}
                      />
                    ) : (
                      <img
                        className="avatar"
                        src={avatar ? avatar : avatarTemplate}
                        alt="avatar"
                      />
                    )}
                  </ProfilImg>
                  <EditProfileEditBtn
                    className="iconEdit"
                    onClick={() => {
                      avatarRef.current!.click();
                    }}
                  >
                    <AiFillEdit />
                  </EditProfileEditBtn>
                </ImgContainer>
                {msg && <div className="msg">{msg}</div>}
                <EditProfileEditContainer>
                  <EditProfileInput
                    defaultValue={username}
                    disable={true}
                    type="text"
                  />
                  <EditProfileEditBtn onClick={handleClickChangeUsername}>
                    <AiFillEdit />
                  </EditProfileEditBtn>
                </EditProfileEditContainer>
                <EditProfileEditContainer>
                  <EditProfileInput
                    defaultValue="Password"
                    disable={true}
                    type="password"
                  />
                  <EditProfileEditBtn onClick={handleClickChangePassword}>
                    <AiFillEdit />
                  </EditProfileEditBtn>
                </EditProfileEditContainer>

                <AvatarWrap>
                  <input
                    ref={avatarRef}
                    type="file"
                    accept=".jpg, .jpeg, .png .webp"
                    className="avatar_input"
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      inputChangeHandler(event);
                    }}
                  />
                </AvatarWrap>
                <Button
                  text={"delete account"}
                  onClick={() => {
                    setOpenDelete(true);
                  }}
                />
                <Button text={"back to profile"} onClick={handleClickBackBtn} />
              </EditProfileForm>
            </EditProfileBox>
          </EditProfileBoxContainer>
          {usernameModalIsOpen ? (
            <ChangeUsernameModal
              onCancel={handleClickBackDrop}
              setUsername={setUsername}
              setMsg={setMsg}
              setErrStatus={setErrStatus}
              setFetching={setFetching}
              fetching={fetching}
            />
          ) : null}
          {passwordModalIsOpen ? (
            <ChangePasswordModal
              onCancel={handleClickBackDrop}
              setMsg={setMsg}
              setErrStatus={setErrStatus}
              setFetching={setFetching}
              fetching={fetching}
            />
          ) : null}

          {modalIsOpen ? (
            <BackDrop
              onClick={() => {
                !fetching && handleClickBackDrop();
              }}
            />
          ) : null}
        </EditProfileMainContainer>
      )}
    </>
  );
};

export default EditProfileComp;
