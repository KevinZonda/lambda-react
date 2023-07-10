import {makeAutoObservable} from "mobx";

export class _SettingStore {
  constructor() {
    makeAutoObservable(this);
  }

  public DefaultTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }
}