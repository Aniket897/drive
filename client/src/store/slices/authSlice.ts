import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { authSliceType } from "../../types";
import axios from "../../axios";
import { toast } from "sonner";

interface loginPayload {
  token: string;
  userData: {
    username: string;
    email: string;
    avatar: string;
    id: string;
  };
}

const initialState: authSliceType = {} as authSliceType;

const slice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<loginPayload>) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.token = "";
      state.userData = {
        username: "",
        email: "",
        id: "",
        avatar: "",
      };
    },
  },
});

export default slice.reducer;
export const { login, logout } = slice.actions;

export function LoginAction(email: string, password: string) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      console.log(response);
      dispatch(login(response.data));
      toast.success("Login suceess");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response.data.message || error?.message;
      toast.error(errorMessage);
      console.log(error);
    }
  };
}

export function RegisterAction(
  email: string,
  password: string,
  username: string
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("/auth/register", {
        email,
        password,
        username,
      });
      console.log(response);
      dispatch(login(response.data));
      toast.success("Registaration suceessfull");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response.data.message || error?.message;
      toast.error(errorMessage);
      console.log(error);
    }
  };
}
