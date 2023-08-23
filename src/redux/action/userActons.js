export const FETCH_USER_LOGIN_SUCESS = 'FETCH_USER_LOGIN_SUCESS'

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCESS,
        payload: data
    }
}