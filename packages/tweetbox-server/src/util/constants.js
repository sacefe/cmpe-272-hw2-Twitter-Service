import {config} from 'dotenv';

config({
    path: `./environments/${process.env.NODE_ENV}.env`
});

export const SERVER = {
    RUNNING: "SERVER_RUNNING",
    STOPPED: "SERVER_STOPPED",
    STARTING: "SERVER_STARTING",
    STOPPING: "SERVER_STOPPING"
}

export const SESSION = {
    SECRET: process.env.SESSION_SECRET
}
