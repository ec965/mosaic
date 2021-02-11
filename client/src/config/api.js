import axios from "axios";
import { getToken } from "../util/util";
require('dotenv').config();

let APIURL = `http://${window.location.host}/api`;
if(process.env.NODE_ENV !== "production"){
  APIURL = `http://${window.location.hostname}:5000/api`
}

export const instance = axios.create({
  baseURL: APIURL,
  headers: {Authorization: `Bearer ${getToken()}`},
  timeout: 9000,
})
// axios instance without a bearer token
// used for logging in and registration
export const noauth = axios.create({
  baseURL: APIURL,
  timeout: 9000,
})


export const LOGIN = "/auth/login";
export const REGISTER = "/auth/register";

export const postLogin = async (username, password) =>
  await noauth.post(LOGIN, { username: username, password: password });

export const postRegister = async (username, password) =>
  await noauth.post(REGISTER, {
    username: username,
    password: password,
  });

export const PASSWORD = '/password';

// general crud operations
export const APP = "/app";
export const PROJECTS = APP + "/projects";
export const NEW = APP + "/new";
export const UPDATE = APP + "/update";
export const DELETE = APP + "/delete";

export const postOrPatchApp = async (data, projectId=null) => {
  if(projectId){
    data.project_id = projectId; // updating requires the project ia
    return await instance.post(NEW, data);
  }
  return await instance.patch(UPDATE, data);
}

// comment crud operations
export const PROJECT = "/project";
export const COMMENT = PROJECT + "/comment";

export const VALIDATE = "/validate";
