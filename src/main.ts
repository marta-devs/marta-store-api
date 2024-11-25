import ExpressAdapter from 'api/express/express-adapter';
import Router from 'api/router';

const port = parseInt(process.env.PORT);
const httpServer = new ExpressAdapter();
const router = new Router(httpServer);

router.init();
httpServer.listen(port);
