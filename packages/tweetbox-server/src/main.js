/**
 * @author Achalaesh Lanka <me@terasurfer.com>
*/
import {config} from 'dotenv';
import {App} from './app';
import logger from './util/logger';

config({
    path: `./environments/${process.env.NODE_ENV}.env`
});

function main() {
    const app = new App();
    // load public webpage route here.
    const port = process.env.PORT;
    const host = process.env.HOST;
    logger.info(`Mounting app on - ${host}:${port}`);
    app.start(port, host);
}

main();
