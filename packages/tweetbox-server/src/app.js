'use strict';
/**
 * @class App 
 * Application class.
 * @author Achalaesh Lanka <me@terasurfer.com>
 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compress from 'compression';
import morgan from 'morgan';
import session from 'express-session';
import { EventEmitter } from 'events';
import logger from './util/logger';
import {SERVER, SESSION} from './util/constants';
import passport from './util/passport';
import router from './routes/router';

export class App extends EventEmitter {

// Initialize http server and load middleware.
    constructor(){
        super();
        this.serverState = SERVER.STOPPED;
        this.httpServer = express();
        logger.info('Configuring default middleware.');
        this.httpServer.use(bodyParser.urlencoded({extended: true}));
        this.httpServer.use(bodyParser.json());
        this.httpServer.use(helmet());
        this.httpServer.use(cors());
        this.httpServer.use(compress());
        this.httpServer.use(morgan('combined'));
        // for session.
        // This is dev config.
        this.httpServer.set('trust proxy', 1);
        this.httpServer.use(session({
            secret: SESSION.SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false, // true in prod
                httpOnly: true,
                sameSite: false // true in prod
            }
        }));
        // passport
        this.httpServer.use(passport.initialize());
        this.httpServer.use(passport.session()); //use passport session after session.
        // router
        this.httpServer.use('/api', router);
    }

// Use middleware.
    use(middleware) {
        if(this.serverState === SERVER.STOPPED) { 
            this.httpServer.use(middleware);
        } else {
            logger.error(`Cannot add middleware while server is ${this.serverState}`);
            this.stop();
        }
    }

//  Stop server.
    stop() {
        if(this.serverState !== SERVER.STOPPED) {
            this.serverState = SERVER.STOPPING;
            this.emit(SERVER.STOPPING);
            try {
                // Close all connections gracefully
            } finally {
                this.serverState = SERVER.STOPPED;
                this.emit(SERVER.STOPPED);
                process.exit(1);
            }
        } else {
            logger.error(`Server is already stopped.`);
        }
    }

    start(port, hostName) {
        if(this.serverState !== SERVER.RUNNING) {
            this.serverState = SERVER.STARTING;
            this.emit(SERVER.STARTING);
            try {
                // Make necessary connections here.
                this.serverState = SERVER.RUNNING;
                this.emit(SERVER.RUNNING);
                this.httpServer.listen(port, hostName, () => {
                    logger.info('Tweetbox server started and is running on http://%s:%d', hostName, port);
                });
            } catch(err) {
                logger.error(e);
                this.serverState = SERVER.STOPPED;
                this.emit(SERVER.STOPPED);
                process.exit(1);
            }
        }
    }

}
