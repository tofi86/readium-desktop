import { Action, ErrorAction } from "readium-desktop/common/models/redux";

import { StreamerStatus } from "readium-desktop/common/models/streamer";

import { streamerActions } from "readium-desktop/main/redux/actions";
import { StreamerState } from "readium-desktop/main/redux/states/streamer";

const initialState: StreamerState = {
    // Streamer base url
    baseUrl: null,

    // Streamer status
    status: StreamerStatus.Stopped,

    // publication id => number of reader opened with this publication
    openPublicationCounter: {},

    // publication id => manifest url
    publicationManifestUrl: {},
};

export function streamerReducer(
    state: StreamerState = initialState,
    action: Action | ErrorAction,
): StreamerState {
    let pubId = null;
    const newState = Object.assign({}, state);

    switch (action.type) {
        case streamerActions.ActionType.StartSuccess:
            newState.status = StreamerStatus.Running;
            newState.baseUrl = action.payload.streamerUrl;
            newState.openPublicationCounter = {};
            newState.publicationManifestUrl = {};
            return newState;
        case streamerActions.ActionType.StopSuccess:
            newState.baseUrl = null;
            newState.status = StreamerStatus.Stopped;
            newState.openPublicationCounter = {};
            newState.publicationManifestUrl = {};
            return newState;
        case streamerActions.ActionType.PublicationOpenSuccess:
            pubId = action.payload.publication.identifier;

            if (!newState.openPublicationCounter.hasOwnProperty(pubId)) {
                newState.openPublicationCounter[pubId] = 1;
                newState.publicationManifestUrl[pubId] = action.payload.manifestUrl;
            } else {
                // Increment the number of publications opened with the streamer
                newState.openPublicationCounter[pubId] = state.openPublicationCounter[pubId] + 1;
            }
            return newState;
        case streamerActions.ActionType.PublicationCloseSuccess:
            pubId = action.payload.publication.identifier;
            newState.openPublicationCounter[pubId] = newState.openPublicationCounter[pubId] - 1;

            if (newState.openPublicationCounter[pubId] === 0) {
                delete newState.openPublicationCounter[pubId];
                delete newState.publicationManifestUrl[pubId];
            }
            return newState;
        default:
            return state;
    }
}
