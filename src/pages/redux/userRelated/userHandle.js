import axios from "axios";
import {
  authRequest,
  stuffAdded,
  authSuccess,
  authFailed,
  authError,
  authLogout,
  doneSuccess,
  getDeleteSuccess,
  getRequest,
  getFailed,
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
