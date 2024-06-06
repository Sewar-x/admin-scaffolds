import Http from '@/plugins/xw-xhttp'

interface AccountInfoModel {
    username: string,
    password: string,
}

export function login(params: AccountInfoModel) {
    return Http.post<AccountInfoModel>(
        {
            baseURL: "http://10.118.1.89:8086",
            url: '/login',
            params,
        },
        {
            successMessageMode: 'message',
            errorMessageMode: 'modal',
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