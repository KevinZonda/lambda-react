import {makeAutoObservable} from "mobx";
import {ManageAPI, StatusAPI} from "./index.ts";

export class _SettingStore {
  constructor() {
    makeAutoObservable(this);
    const _ep = localStorage.getItem("endpoint")
    if (_ep) {
      this.setEndPoint(_ep)
    }
    const _apiKey = localStorage.getItem("apiKey")
    if (_apiKey) {
      this.apiKey = _apiKey
    }
  }

  public DefaultTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  private _apiKey = '';
  public get apiKey() {
    return this._apiKey
  }
  public set apiKey(apiKey: string) {
    this._apiKey = apiKey
    localStorage.setItem("apiKey", apiKey)
  }

  public getAxiosOptions() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorisation': this._apiKey
      }
    }
  }
  public setEndPoint(ep : string) {
    StatusAPI.setBasePath(ep)
    ManageAPI.setBasePath(ep)
    localStorage.setItem("endpoint", ep)
  }

  public getEndPoint() {
    return StatusAPI.getBasePath()
  }
}