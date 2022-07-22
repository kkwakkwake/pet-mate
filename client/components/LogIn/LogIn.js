import Link from "next/link";
import Router from "next/router";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../../reducers/user";
import {
  LogInContainer,
  FormWrapper,
  InputWrapper,
  UserInput,
  LoginBtn,
  GoogleBtn,
  KakaoBtn,
  CheckInput,
  SnackBarContent
} from "./styled";

// const serverUrl = 'http://127.0.0.1:3000';

const LogIn = () => {
  const [snackBar, setSnackBar] = useState(false);
  const handleClose = () => {
    setSnackBar(false);
  };
  // const serverUrl = "http://api.petmate.kr";
  const serverUrl = "http://127.0.0.1:3000";
  const dispatch = useDispatch();
  const { me, logInError } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (logInError !== null) {
      setSnackBar(true);
      // alert(logInError.message);
    }
  }, [logInError]);

  const handleLoginSubmit = useCallback(() => {
    const emailregExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (emailregExp.test(email) === false || !email) {
      setEmail("");
      emailRef.current.focus();
      return setEmailIsValid(false);
    }
    if (!password) {
      return passwordRef.current.focus();
    }

    const newUser = {
      email,
      password,
    };

    dispatch(loginRequestAction(newUser));
  }, [email, password]);

  const handleLoginEmail = (e) => {
    setEmail(e.target.value);
    setEmailIsValid(true);
  };

  const handleGoogleLoginSubmit = useCallback(() => {
    Router.push(`${serverUrl}/user/google`);
  }, []);

  const handleKakaoLoginSubmit = useCallback(() => {
    Router.push(`${serverUrl}/user/kakao`);
  }, []);

  useEffect(() => {
    if (me) {
      Router.push("/");
    }
  }, [me]);

  return (
    <LogInContainer>
      <h1>로그인</h1>
      <FormWrapper>
        <InputWrapper>
          <label>이메일</label>
          <UserInput
            type="email"
            value={email}
            ref={emailRef}
            onChange={handleLoginEmail}
          ></UserInput>
          {!emailIsValid && (
            <CheckInput color="red">유효하지 않은 이메일입니다.</CheckInput>
          )}
        </InputWrapper>
        <InputWrapper>
          <label>비밀번호</label>
          <UserInput
            type="password"
            value={password}
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLoginSubmit();
            }}
          ></UserInput>
        </InputWrapper>
        <LoginBtn onClick={handleLoginSubmit}>로그인</LoginBtn>
        <GoogleBtn onClick={handleGoogleLoginSubmit}>구글 로그인</GoogleBtn>
        <KakaoBtn onClick={handleKakaoLoginSubmit}>카카오 로그인</KakaoBtn>
      </FormWrapper>
      <p>
        <Link href="/signup">
          <a>아직 아이디가 없으신가요? 회원가입 하러가기</a>
        </Link>
      </p>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackBar}
        autoHideDuration={3000}
        onClose={handleClose}
        key={"bottomcenter"}
      >
        <SnackBarContent>{logInError?.message}</SnackBarContent>
      </Snackbar>
    </LogInContainer>
  );
};

export default LogIn;
