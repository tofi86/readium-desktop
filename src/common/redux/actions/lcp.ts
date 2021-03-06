import { Publication } from "readium-desktop/common/models/publication";
import { Reader, ReaderConfig } from "readium-desktop/common/models/reader";
import { Action } from "readium-desktop/common/models/redux";

export enum ActionType {
    UserKeyCheckRequest = "LCP_USER_KEY_CHECK_REQUEST",
    UserKeyCheckError = "LCP_USER_KEY_CHECK_ERROR",
    UserKeyCheckSuccess = "LCP_USER_KEY_CHECK_SUCCESS",

    PassphraseSubmitRequest = "LCP_PASSPHRASE_SUBMIT_REQUEST",
    PassphraseSubmitSuccess = "LCP_PASSPHRASE_SUBMIT_SUCCESS",
    PassphraseSubmitError = "LCP_PASSPHRASE_SUBMIT_ERROR",

    ReturnRequest = "LCP_RETURN_REQUEST",
    ReturnSuccess = "LCP_RETURN_SUCCESS",
    ReturnError = "LCP_RETURN_ERROR",

    RenewRequest = "LCP_RENEW_REQUEST",
    RenewSuccess = "LCP_RENEW_SUCCESS",
    RenewError = "LCP_RENEW_ERROR",

    StatusUpdateRequest = "LCP_STATUS_UPDATE_REQUEST",
    StatusUpdateSuccess = "LCP_STATUS_UPDATE_SUCCESS",
    StatusUpdateError = "LCP_STATUS_UPDATE_ERROR",
}

export function checkUserKey(publication: Publication, hint: string): Action {
    return {
        type: ActionType.UserKeyCheckRequest,
        payload: {
            publication,
            hint,
        },
    };
}

export function sendPassphrase(publication: Publication, passphrase: string): Action {
    return {
        type: ActionType.PassphraseSubmitRequest,
        payload: {
            publication,
            passphrase,
        },
    };
}

export function lsdRenew(publication: Publication): Action {
    return {
        type: ActionType.RenewRequest,
        payload: {
            publication,
        },
    };
}

export function lsdReturn(publication: Publication): Action {
    return {
        type: ActionType.ReturnRequest,
        payload: {
            publication,
        },
    };
}
