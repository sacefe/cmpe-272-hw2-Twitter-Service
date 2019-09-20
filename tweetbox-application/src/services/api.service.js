import {ajax} from './index';

export const getApiStatus = () => {
    return ajax.get('status');
}