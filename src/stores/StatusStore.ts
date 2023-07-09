import {makeAutoObservable} from "mobx";
import {StatusItem} from "../api";
import {StatusAPI} from "./index.ts";

export class _StatusStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _status : Record<string, StatusItem> = {};

  public get status() : Record<string, StatusItem> {
    return this._status;
  }

  public async fetchStatus() {
    const v = await StatusAPI.getAllStatus()
    this._status = v.data
  }


}