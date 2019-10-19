import {ajax} from './index';

export const getUser = () => {
    return ajax.get('user');
}

export const sendMessage = (recipientId, message) => {
    return ajax.post('/twitter/direct-message', {
        recipientId,
        message
    });
}

export const createTweet = (message) => {
    return ajax.post('/twitter/create-tweet', {
        message
    });
}

export const deleteTweet = (id) => {
    return ajax.delete(`/twitter/tweet/${id}`);
}

export const getTweet = (id) => {
    return ajax.get(`/twitter/tweet/${id}`);
}
