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

export const DATABASE = {
    URL: process.env.DB_URL
}

export const FRONTEND = {
    URL: process.env.FRONTEND_URL
}

export const ERRORS = {
    NOT_LOGGEDIN: 101
}

export const TWITTER = {
    CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
    DIRECTMESSAGE_URL: 'https://api.twitter.com/1.1/direct_messages'
}
