import axios from "../config/axios";

export async function loginUser(dispatch, loginPayload) {
 
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await axios.post('/login',loginPayload);
    let data = await response.data;
    if (data.status) {
      localStorage.setItem('currentUserId', data.id);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      return data;
    }

    dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
    return data;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUserId');
}


export const uploadFile = (file, onUploadProgress) => {
  let formData = new FormData();
  let currentUserId = localStorage.getItem("currentUserId")

  formData.append("buffer", file);

  return axios.post(`/upload/${currentUserId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

export async function getUserFiles () {
  let currentUserId = localStorage.getItem("currentUserId");
  let response = await axios.get(`/documents/${currentUserId}`);
  return response;
};

export async function getUserFile (docId) {
  let response = await axios.get(`/document/${docId}`);
  return response;
};

export async function registerUser(payload) {
  let response = await axios.post('/register',payload);
  return response;
};


export async function createBenefiary (payload) {
  let currentUserId = localStorage.getItem("currentUserId");
  let response = await axios.post(`/beneficiaries/${currentUserId}`,payload);
  return response;
};

export async function getBeneficiaries() {
  let currentUserId = localStorage.getItem("currentUserId");
  let response = await axios.get(`/beneficiaries/${currentUserId}`);
  return response;
};