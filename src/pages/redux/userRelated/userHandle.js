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
  dispatch(authRequest());
  try {
    const result = await axios.post(`${backendUrl}/${role}Login`, fields, {
      headers: { "Content-Type": " application/json" },
    });
    if (result.data.role) {
      dispatch(authSuccess(result.data));
    }
  } catch (error) {}
};

export const registerUser = (fields, role) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.post(`${backendUrl}/${role}Reg`, fields, {
      headers: { "Content-Type": "application/json" },
    });
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
