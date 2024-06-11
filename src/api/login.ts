import Http from '@/plugins/xw-xhttp'

interface AccountInfoModel {
    username: string,
    password: string,
}

export function login(params: AccountInfoModel) {
    return Http.post(
        {
            url: '/login',
        },
        {
            errorMessageMode: 'message',
        },
    );
}

export function logout() {
    return Http.post(
        {
            url: '/logout',
        },
        {
            errorMessageMode: 'message',
        },
    );
}


export const checkSSOLogin = () => {
    return Http.post(
        {
            url: '/checkSSOLogin',
        },
        {
            errorMessageMode: 'message',
        },
    );
}

export const getAuthList = (params: any) => {
    return Http.post(
        {
            url: '/getAuthList',
        },
        {
            errorMessageMode: 'message',
        },
    );
}
