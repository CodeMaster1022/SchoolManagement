import axios from "axios";
import {
  authRequest,
  stuffAdded,
  authSuccess,
  authFailed,
  // authError,
  // authLogout,
  // doneSuccess,
  // getDeleteSuccess,
  getRequest,
  // getFailed,
  getError,
} from "./userSlice";

const backendUrl = "http://localhost:5000";

export const loginUser = (fields, role) => async (dispatch) => {
  console.log(fields, role);
  dispatch(authRequest());
  try {
    const result = await axios.post(`${backendUrl}/${role}Login`, fields, {
      headers: { "Content-Type": " application/json" },
    });
    if (result.data.role) {
      dispatch(authSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const registerUser = (values, role) => async (dispatch) => {
  console.log(values, role);
  dispatch(getRequest());
  try {
    const result = await axios.post(`${backendUrl}/${role}Reg`, values, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(result);
    if (result.data.schoolName) {
      dispatch(authSuccess(result.data));
    } else if (result.data.school) {
      dispatch(stuffAdded());
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
