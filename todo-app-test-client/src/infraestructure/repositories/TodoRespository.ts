import ITodoRepository from "../../domain/interfaces/repositories/ITodoRepository"
import { AsyncApiResponse } from "../../domain/models/RequestResultModel"
import { TodoModel } from "../../domain/models/TodoModel"
import { sendRequest } from "../datasources/axios"



export default class TodoRepository implements ITodoRepository {
    async get(): Promise<AsyncApiResponse<TodoModel[]>> {
        const request = {
            get: {
                path: `${process.env.REACT_APP_API_URL_OPERATIONS}skill-type`,
            },
        }
        return await sendRequest<TodoModel[]>(request)
    }

    async getById(id: string): Promise<AsyncApiResponse<TodoModel>> {
        const request = {
            get: {
                path: `${process.env.REACT_APP_API_URL_OPERATIONS}skill-type/${id}`,
            },
        }
        return await sendRequest<TodoModel>(request)
    }

    async delete(id: string): Promise<AsyncApiResponse<TodoModel>> {
        const request = {
            delete: {
                path: `${process.env.REACT_APP_API_URL_OPERATIONS_BASE}scientific-productions/${id}`,
            },
        }
        return await sendRequest<TodoModel>(request)
    }
    async create(data: TodoModel): Promise<AsyncApiResponse<TodoModel>> {
        const request = {
            post: {
                path: `${process.env.REACT_APP_API_URL_OPERATIONS_BASE}scientific-productions`,
                body: data,
            },
        }
        return await sendRequest<TodoModel>(request)
    }
    async update(data: TodoModel): Promise<AsyncApiResponse<TodoModel>> {
        const request = {
            put: {
                path: `${process.env.REACT_APP_API_URL_OPERATIONS_BASE}scientific-productions/${data.id}`,
                body: data,
            },
        }
        return await sendRequest<TodoModel>(request)
    }

}