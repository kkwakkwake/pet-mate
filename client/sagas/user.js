import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOAD_MY_POSTS_FAILURE,
  LOAD_MY_POSTS_REQUEST,
  LOAD_MY_POSTS_SUCCESS,
  LOAD_MY_COMMENTS_FAILURE,
  LOAD_MY_COMMENTS_REQUEST,
  LOAD_MY_COMMENTS_SUCCESS,
  LOAD_MY_LIKED_FAILURE,
  LOAD_MY_LIKED_REQUEST,
  LOAD_MY_LIKED_SUCCESS,
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
} from "../reducers/user";

const serverUrl = `http://api.petmate.kr`;
// const serverUrl = `http://127.0.0.1:3000`;

function signUpAPI(data) {
  return axios.post(`${serverUrl}/user/signup`, data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    const payload = result.data;
    yield put({
      type: SIGN_UP_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function signOutAPI() {
  return axios.delete(`${serverUrl}/user/signout`, { withCredentials: true });
}

function* signOut(action) {
  try {
    const result = yield call(signOutAPI);
    const payload = result.data;
    yield put({
      type: SIGN_OUT_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post(`${serverUrl}/user/login`, data, {
    withCredentials: true,
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    const payload = result.data;
    yield put({
      type: LOG_IN_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.get(`${serverUrl}/user/logout`);
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}
function loadMyPostsAPI() {
  return axios.get(`${serverUrl}/user/posts`, { withCredentials: true });
}

function* loadMyPosts(action) {
  try {
    const result = yield call(loadMyPostsAPI, action.data);
    const payload = result.data;
    yield put({
      type: LOAD_MY_POSTS_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMyCommentsAPI() {
  return axios.get(`${serverUrl}/user/commented-posts`, { withCredentials: true });
}

function* loadMyComments(action) {
  try {
    const result = yield call(loadMyCommentsAPI, action.data);
    const payload = result.data;
    yield put({
      type: LOAD_MY_COMMENTS_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_COMMENTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMyLikedAPI() {
  return axios.get(`${serverUrl}/user/liked-posts`, { withCredentials: true });
}

function* loadMyLiked(action) {
  try {
    const result = yield call(loadMyLikedAPI, action.data);
    const payload = result.data;
    yield put({
      type: LOAD_MY_LIKED_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_LIKED_FAILURE,
      error: err.response.data,
    });
  }
}

function editProfileAPI(data) {
  return axios.post(`${serverUrl}/user/profile`, data, {
    withCredentials: true,
  });
}

function* editProfile(action) {
  try {
    console.log(action.data);
    const result = yield call(editProfileAPI, action.data);
    const payload = result.data;
    yield put({
      type: EDIT_PROFILE_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_PROFILE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchSignOut() {
  yield takeLatest(SIGN_OUT_REQUEST, signOut);
}

function* watchLoadMyPosts() {
  yield takeLatest(LOAD_MY_POSTS_REQUEST, loadMyPosts);
}

function* watchLoadMyComments() {
  yield takeLatest(LOAD_MY_COMMENTS_REQUEST, loadMyComments);
}

function* watchLoadMyLiked() {
  yield takeLatest(LOAD_MY_LIKED_REQUEST, loadMyLiked);
}

function* watchEditProfile() {
  yield takeLatest(EDIT_PROFILE_REQUEST, editProfile);
}

export default function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchSignOut),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchLoadMyPosts),
    fork(watchLoadMyComments),
    fork(watchLoadMyLiked),
    fork(watchEditProfile),
  ]);
}
