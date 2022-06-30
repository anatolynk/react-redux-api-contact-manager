// Api Request Actions
import { createAction } from "@reduxjs/toolkit";

export const apiRequestStart = createAction("api/requestStart");
export const apiRequestSuccess = createAction("api/requestSuccess");
export const apiRequestFail = createAction("api/requestFail");
