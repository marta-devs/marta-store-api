import { Controller } from './controller';

export enum MethodEnum {
	POST = 'post',
	GET = 'get',
	PUT = 'put',
	DELETE = 'delete',
	PATCH = 'patch',
}

export interface HttpServer {
	route(method: MethodEnum, url: string, controller: Controller): void;
	listen(port: number): void;
}
