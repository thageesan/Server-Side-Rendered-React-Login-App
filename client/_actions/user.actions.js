
import { userConstants } from './../_constants';
import { userService } from './../_services';

export const userActions = {
    updateUsernameField,
    updatePasswordField,
    logout,
    failedLogin
};

function updateUsernameField(payload) {
    return {
        type: userConstants.UPDATE_USERNAME_FIELD,
        payload: payload
    };
}

function updatePasswordField(payload) {
    return {
        type: userConstants.UPDATE_PASSWORD_FIELD,
        payload: payload
    };
}

function failedLogin(payload) {
    return {
        type: userConstants.FAILED_LOGIN,
        payload
    }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}