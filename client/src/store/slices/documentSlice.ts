import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "../../axios";
import { Document, DocumentSliceType } from "../../types";

const initialState: DocumentSliceType = {
  documents: [],
} as DocumentSliceType;

const slice = createSlice({
  name: "documetSlice",
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },
    updateDocument: (state, action: PayloadAction<Document>) => {
      state.documents = state.documents.map((item) => {
        return item._id == action.payload._id ? action.payload : item;
      });
    },
    addDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents.push(...action.payload);
    },
  },
});

export default slice.reducer;
export const { setDocuments, updateDocument, addDocuments } = slice.actions;

export function uploadDocuments(formData: FormData) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const response = await axios.post("/document/upload", formData, {
        headers: {
          Authorization: `bearer ${getState().auth.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      dispatch(addDocuments(response.data.documents));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDocuments() {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const response = await axios.get("/document/my", {
        headers: {
          Authorization: `bearer ${getState().auth.token}`,
        },
      });
      console.log(response);
      dispatch(setDocuments(response.data.documents));
    } catch (error) {
      console.log(error);
    }
  };
}

export function toogleStatus(id: string, status: boolean) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const response = await axios.post(
        `/document/toggle/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `bearer ${getState().auth.token}`,
          },
        }
      );
      console.log(response);
      dispatch(updateDocument(response.data.document));
    } catch (error) {
      console.log(error);
    }
  };
}
