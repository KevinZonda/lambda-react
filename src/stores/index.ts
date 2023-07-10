import {_StatusStore} from "./StatusStore.ts";
import {ManagementApi, StatusApi} from "../api";
import {_SettingStore} from "./SettingStore.ts";

export const StatusAPI = new StatusApi();
export const ManageAPI = new ManagementApi();

export const SettingStore = new _SettingStore()
export const StatusStore = new _StatusStore();