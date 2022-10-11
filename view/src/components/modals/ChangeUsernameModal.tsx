import React, { FC, useState } from "react";
import Button from "../button/Button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  ModalBox,
  ModalCancelBtn,
  ModalErrorDiv,
  ModalForm,
  ModalInput,
  ModalTitle,
} from "./ChangeItemsModalStyles";
import { CgClose } from "react-icons/cg";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { uri } from "../../variables/Variables";

interface usernameModalProps {
  onCancel?: () => void | undefined;
  setUsername?: any;
  setMsg?: any;
  setErrStatus?:any;
  setFetching?:any;
  fetching?:boolean;
}

const ChangeUsernameModal: FC<usernameModalProps> = (props) => {
  const [newUsername, setNewUsername] = useState<string>("");
  const [errorUsernameState, setErrorUsernameState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cookies, setCookie] = useCookies(["userToken"]);

  const handleChangeUsername = (event: React.FormEvent<HTMLInputElement>) => {
    setNewUsername(event.currentTarget.value);
  };

  const handleClickSave = async () => {
    if (
      checkForSpecialChars(newUsername) ||
      newUsername === "" ||
      newUsername == null
    ) {
      setErrorUsernameState(true);
      setErrorMessage("Invalid new username!");
    } else {
      setErrorUsernameState(false);
      try {
        props.setFetching(true)
        const resp = await axios.post(
          `${uri}/users/update`,
          { target: "username", value: newUsername },
          {
            headers: { Authorization: `Bearer ${cookies["userToken"]}` },
          }
        );
        props.setUsername(resp.data.username);
        setCookie("userToken", resp.data.token, {
          path: "/",
          sameSite: "none",
          secure: true,
          maxAge: 3600,
        });
        props.setFetching(false)
        props.setMsg(resp.data.msg);
        props.onCancel?.();
      } catch (error: any) {
        const status = error.response.status;
        props.setErrStatus(String(status));
        props.onCancel?.();
      }
    }
  };

  const checkForSpecialChars = (str: string): boolean => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  };

  return (
    <ModalBox>
      <ModalForm>
        <ModalTitle>Edit Username</ModalTitle>
        <ModalInput
          placeholder="new username"
          onChange={handleChangeUsername}
          haveError={errorUsernameState ? true : false}
          disable={props.fetching ? true : false}
        />
        {errorUsernameState ? (
          <ModalErrorDiv>{errorMessage}</ModalErrorDiv>
        ) : null}
        <Button text={props.fetching ? <AiOutlineLoading3Quarters className="icon"/> : "Save changes"} onClick={handleClickSave} />
      </ModalForm>
      <ModalCancelBtn onClick={()=>{!props.fetching && props.onCancel?.()}}>
        <CgClose />
      </ModalCancelBtn>
    </ModalBox>
  );
};

export default ChangeUsernameModal;
