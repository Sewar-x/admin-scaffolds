// 使用示例  
import LocalStorageWrapper from "./storage"


export const localStorageUtils = new LocalStorageWrapper('localStorage');

export const sessionStorageUtils = new LocalStorageWrapper('sessionStorage');

export const cookieUtils = new LocalStorageWrapper('cookie');


