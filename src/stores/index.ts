import {_StatusStore} from "./StatusStore.ts";
import {ManagementApi, StatusApi} from "../api";

export const StatusStore = new _StatusStore();
export const StatusAPI = new StatusApi();
export const ManageAPI = new ManagementApi();