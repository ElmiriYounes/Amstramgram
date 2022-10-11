import React, { FC, useState } from "react";
import Button from "../button/Button";
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
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { uri } from "../../variables/Variables";

interface passwordModalProps {
  onCancel?: () => void | undefined;
  setMsg?: any;
  setErrStatus?: any;
  setFetching?:any;
  fetching?:boolean;
}

const ChangePasswordModal: FC<passwordModalProps> = (props) => {
  const [cookies, setCookie] = useCookies(["userToken"]);

  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");
  const [errorPasswordState, setErrorPasswordState] = useState<boolean>(false);
  const [errorConfirmationState, setErrorConfirmationState] =
    useState<boolean>(false);
  const [errorIdenticalPassword, setErrorIdenticalPassword] =
    useState<boolean>(false);
  const [errorIdenticalOldNewPasswords, setErrorIdenticalOldNewPasswords] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setNewPassword(event.currentTarget.value);
  };

  const handleChangePasswordConfirmation = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setNewPasswordConfirmation(event.currentTarget.value);
  };

  const handleClickSave = async () => {
    if (newPassword !== newPasswordConfirmation) {
      setErrorIdenticalPassword(true);
      setErrorConfirmationState(true);
      setErrorPasswordState(true);
      setErrorMessage("Password and confirmation must be the same!");
    } else {
      setErrorIdenticalPassword(false);
    }

    if (newPasswordConfirmation === "" || newPasswordConfirmation == null) {
      // console.log('invalid password confirm');
      setErrorConfirmationState(true);
      setErrorMessage("Invalid password confirmation!");
    } else {
      // console.log('password confirm : ' + passwordConfirm);
      setErrorConfirmationState(false);
    }

    if (newPassword === "" || newPassword == null) {
      // console.log('invalid password');
      setErrorPasswordState(true);
      setErrorMessage("Invalid new password!");
    } else {
      // console.log('password : ' + password);
      setErrorPasswordState(false);
    }

    if (
      newPasswordConfirmation !== "" &&
      newPasswordConfirmation !== null &&
      newPassword &&
      newPassword !== "" &&
      newPassword !== null &&
      newPassword === newPasswordConfirmation
    ) {
      try {
      props.setFetching(true)
        const resp = await axios.post(
          `${uri}/users/update`,
          { target: "password", value: newPassword },
          {
            headers: { Authorization: `Bearer ${cookies["userToken"]}` },
          }
        );
        props.setMsg(resp.data.msg);
        props.setFetching(false)
        props.onCancel?.();
      } catch (error: any) {
        const status = error.response.status;
        props.setErrStatus(String(status));
        props.onCancel?.();
      }
    }
  };

  return (
    <ModalBox>
      <ModalForm>
        <ModalTitle>Edit Password</ModalTitle>
        <ModalInput
          placeholder={"new password"}
          onChange={handleChangePassword}
          haveError={errorPasswordState ? true : false}
          type="password"
          disable={props.fetching ? true : false}
        />
        <ModalInput
          placeholder={"confirmation"}
          onChange={handleChangePasswordConfirmation}
          haveError={errorConfirmationState ? true : false}
          type="password"
          disable={props.fetching ? true : false}
        />
        {(errorPasswordState ||
          errorConfirmationState ||
          errorIdenticalPassword ||
          errorIdenticalOldNewPasswords) && (
          <ModalErrorDiv>{errorMessage}</ModalErrorDiv>
        )}
        <Button text={!props.fetching ? "Save changes" : <AiOutlineLoading3Quarters className="icon"/>} onClick={handleClickSave} />
      </ModalForm>
      <ModalCancelBtn onClick={()=>{!props.fetching && props.onCancel?.()}}>
        <CgClose />
      </ModalCancelBtn>
    </ModalBox>
  );
};

export default ChangePasswordModal;
