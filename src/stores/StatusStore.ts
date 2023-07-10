import {makeAutoObservable, runInAction} from "mobx";
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

  private _isFetching = false;
  public get isFetching() {
    return this._isFetching
  }

  public async fetchStatus() {
    if (this._isFetching) {
      return
    }
    runInAction(() => {
      this._isFetching = true
    })
    const v = await StatusAPI.getAllStatus()
    runInAction(() => {
      this._status = v.data
      this._isFetching = false
    })
  }
}