import { chatConstants } from '../constants';

export const chatActions = {
    load,
    send,
    deleteChat,
    receive,
};


function load(userId) {
    return { type: chatConstants.LOAD_CHAT, userId: userId};
}

function deleteChat(userId) {
    return { type: chatConstants.DELETE_ALL_CHAT, userId: userId};
}

function send(userId, msg) {
    return { type: chatConstants.SEND_CHAT, payload: { userId, msg} };
}

function receive(userId, msg) {
    return { type: chatConstants.RECEIVE_CHAT, payload: { userId, msg} };
}

