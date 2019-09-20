import Ajax from 'axios';
import {devConfig} from '../config';
import {getApiStatus} from './api.service';

// ajax init
const ajax = Ajax.create({
    baseURL: devConfig.baseURL
});

export {ajax, getApiStatus};