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
  timeout: 5000,
})


export const LOGIN = "/auth/login";
export const REGISTER = "/auth/register";

export const postLogin = async (username, password) =>
  await instance.post(LOGIN, { username: username, password: password });

export const postRegister = async (username, password) =>
  await instance.post(REGISTER, {
    username: username,
    password: password,
  });

export const APP = "/app";
export const USERPROJECTS = APP + "/myprojects";
export const NEW = APP + "/new";
export const UPDATE = APP + "/update";
export const RECENT = APP + "/recent";

export const getAppUserProjects = async (username) =>
  await instance.get(USERPROJECTS, {params: {username: username}});

export const postAppNew = async (data) =>
  await instance.post(NEW, data);

export const patchAppUpdate = async (data) =>
  await instance.patch(UPDATE, data);

export const getAppRecent = async () =>
  await instance.get(RECENT);

export const postOrPatchApp = async (data, projectId=null) => {
  if(projectId){
    data.project_id = projectId; // updating requires the project ia
    return await patchAppUpdate(data);
  }
  return await postAppNew(data);
}

export const PROJECT = "/project";
export const COMMENT = PROJECT + "/comment";
export const DELETE = PROJECT + "/delete";

export const getProject = async (id) =>
  await instance.get(PROJECT, {params: {id: id}});

export const deleteProject = async (id) =>
  await instance.delete(DELETE, {params: {id: id}});

export const postProjectComment = async (projectId, text) =>
  await instance.post(
    COMMENT,
    { project_id: projectId, text: text },
  );

export const deleteProjectComment = async (projectId, commentId) =>
  await instance.delete(COMMENT, {params: {project_id: projectId, comment_id: commentId}});

export const patchProjectComment = async (projectId, commentId, text) =>
  await instance.patch(COMMENT, { project_id: projectId, comment: { id: commentId, text: text } });

export const VALIDATE = "/validate";
