export type HttpRequest = {
	body?: any;
	params?: any;
	query?: any;
};

export type HttpResponse = {
	status: number;
	body?: any;
};

export interface Controller {
	handle(params: HttpRequest): Promise<HttpResponse>;
}
