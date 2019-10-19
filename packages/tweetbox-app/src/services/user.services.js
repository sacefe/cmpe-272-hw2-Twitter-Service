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
