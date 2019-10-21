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
import {SERVER, SESSION, DATABASE} from './util/constants';
import passport from './util/passport';
import router from './routes/router';
import mongoose from 'mongoose';
import connectRedis from 'connect-redis';
import redis from 'redis';
import csrf from 'csurf';

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
        const corsOptions = {
            origin: 'http://localhost:8080', //change in prod
            credentials: true,
        };
        this.httpServer.use(cors(corsOptions));
        this.httpServer.use(compress());
        this.httpServer.use(morgan('combined'));
        // for session.
        // This is dev config.
        this.httpServer.set('trust proxy', 1);
        // dev config for redis client.
        let redisClient = redis.createClient();
        redisClient.SET('connected', 'true');
        redisClient.on('error', logger.error);
        const redisStore = connectRedis(session);
        this.httpServer.use(session({
            secret: SESSION.SECRET,
            resave: false,
            saveUninitialized: true,
            store: new redisStore({client: redisClient, prefix: 'tweetbox'}),
            name: 'tweetbox-sid',
            cookie: {
                secure: false, // true in prod
                httpOnly: true,
                sameSite: false, // true in prod
            }
        }));
        
        // Make necessary connections here.
        mongoose.connect(DATABASE.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        // passport
        this.httpServer.use(passport.initialize());
        this.httpServer.use(passport.session()); //use passport session after session.
        // Csrf protection
        const csrfProtection = csrf();
        this.httpServer.use(csrfProtection);
        this.httpServer.use(function(req, res, next) {
            res.cookie('XSRF-TOKEN', req.csrfToken());     
            res.locals._csrf = req.csrfToken();
            next();
        });
        this.httpServer.use(function (err, req, res, next) {
            if (err.code !== 'EBADCSRFTOKEN') return next(err)
          
            // handle CSRF token errors here
            res.status(403);
        });
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
                this.serverState = SERVER.RUNNING;
                this.emit(SERVER.RUNNING);
                return this.httpServer.listen(port, hostName, () => {
                    logger.info('Tweetbox server started and is running on http://%s:%d', hostName, port);
                });
            } catch(err) {
                logger.error(err);
                this.serverState = SERVER.STOPPED;
                this.emit(SERVER.STOPPED);
                process.exit(1);
            }
        }
    }

    getHTTPServer() {
        return this.httpServer;
    }

}
