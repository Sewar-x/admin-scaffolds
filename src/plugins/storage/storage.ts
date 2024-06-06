import Cookies from 'js-cookie';

export default class LocalStorageWrapper {
    private type: 'localStorage' | 'sessionStorage' | 'cookie';

    constructor(type: 'localStorage' | 'sessionStorage' | 'cookie') {
        this.type = type;
    }

    setItem(key: string, value: string | object, expires?: number): void {
        if ((value !== null || value != undefined) && typeof value === 'object') {
            value = JSON.stringify(value)
        }
        switch (this.type) {
            case 'localStorage':
                window.localStorage.setItem(key, value);
                break;
            case 'sessionStorage':
                window.sessionStorage.setItem(key, value);
                break;
            case 'cookie':
                Cookies.set(key, value, { expires: expires });
                break;
            default:
                throw new Error('Invalid storage type');
        }
    }

    getItem(key: string): string | object | null {
        let result = null
        let value = null
        switch (this.type) {
            case 'localStorage':
                value = window.localStorage.getItem(key);
                break;
            case 'sessionStorage':
                value = window.sessionStorage.getItem(key);
                break;
            case 'cookie':
                value = Cookies.get(key);
                break;
            default:
                value = null
        }


        try {
            if (value) {
                result = JSON.parse(value)
            }
        } catch (e) {
            result = value
        }
        return result
    }

    removeItem(key: string): void {
        switch (this.type) {
            case 'localStorage':
                window.localStorage.removeItem(key);
                break;
            case 'sessionStorage':
                window.sessionStorage.removeItem(key);
                break;
            case 'cookie':
                Cookies.remove(key);
                break;
            default:
                throw new Error('Invalid storage type');
        }
    }

    clear(): void {
        switch (this.type) {
            case 'localStorage':
                window.localStorage.clear();
                break;
            case 'sessionStorage':
                window.sessionStorage.clear();
                break;
            case 'cookie':
                // 对于 cookie，js-cookie 没有直接提供 clear 方法，需要遍历并删除 
                /* eslint-enable no-unused-vars */
                for (const key in (Cookies.get() as Object)) {
                    Cookies.remove(key);
                }
                break;
            default:
                throw new Error('Invalid storage type');
        }
    }
}

