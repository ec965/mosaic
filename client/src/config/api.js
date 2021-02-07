import axios from "axios";
import { getToken } from "../util/util";

const header = { headers: { Authorization: `Bearer ${getToken()}` } };

export const APIADDRESS = "localhost";
export const APIPORT = "5000";
export const APIURL = `http://${APIADDRESS}:${APIPORT}`;

const LOGIN = "/auth/login";
const REGISTER = "/auth/register";
export const postLogin = async (username, password) =>
  await axios.post(APIURL + LOGIN, { username: username, password: password });
export const postRegister = async (username, password) =>
  await axios.post(APIURL + REGISTER, {
    username: username,
    password: password,
  });

export const APP = "/app";
export const USERPROJECTS = APP + "/myprojects";
export const NEW = APP + "/new";
export const UPDATE = APP + "/update";
export const RECENT = APP + "/recent";
export const getAppUserProjects = async (username) =>
  await axios.get(APIURL + USERPROJECTS + `?username=${username}`, header);
export const postAppNew = async (data) =>
  await axios.post(APIURL + NEW, data, header);
export const patchAppUpdate = async (data) =>
  await axios.patch(APIURL + UPDATE, data, header);
export const getAppRecent = async () =>
  await axios.get(APIURL + RECENT, header);
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
  await axios.get(APIURL + PROJECT + `?id=${id}`, header);
export const deleteProject = async (id) =>
  await axios.delete(APIURL + DELETE + `?id=${id}`, header);
export const postProjectComment = async (projectId, text) =>
  await axios.post(
    APIURL + COMMENT,
    { project_id: projectId, text: text },
    header
  );
export const deleteProjectComment = async (projectId, commentId) =>
  await axios.delete(
    APIURL + COMMENT + `?project_id=${projectId}&comment_id=${commentId}`,
    header
  );
export const patchProjectComment = async (projectId, commentId, text) =>
  await axios.patch(
    APIURL + COMMENT,
    { project_id: projectId, comment: { id: commentId, text: text } },
    header
  );

export const VALIDATE = "/validate";
