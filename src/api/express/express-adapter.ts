import { Controller } from 'api/protocols/controller';
import { HttpServer, MethodEnum } from 'api/protocols/http-server';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { ControllerErrorMiddleware } from 'api/middlewares/controller-error-middleware';

export default class ExpressAdapter implements HttpServer {
	app: any;

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(express.json());
	}

	route(method: MethodEnum, url: string, controller: Controller): void {
		this.app[method](url, async (req: Request, res: Response) => {
			const httpRequest = {
				body: req.body,
			};
			console.log(req.body);
			const response = await new ControllerErrorMiddleware(controller).handle(
				req,
			);

			if (response.status === 200 || response.status === 201) {
				res.status(response.status);
			} else {
				res.status(response.status).json(response.body);
			}
		});
	}

	listen(port: number): void {
		this.app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	}
}
