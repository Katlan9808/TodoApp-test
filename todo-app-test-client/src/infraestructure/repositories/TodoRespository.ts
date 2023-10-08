import ITodoRepository from "../../domain/interfaces/repositories/ITodoRepository"
import { AsyncApiResponse } from "../../domain/models/RequestResultModel"
import { TodoModel } from "../../domain/models/TodoModel"
import { sendRequest } from "../datasources/axios"

const urlAPI = 'http://localhost:5052/';

export default class TodoRepository implements ITodoRepository {
    async get(): Promise<AsyncApiResponse<TodoModel[]>> {
        const request = {
            get: {
                path: `${urlAPI}api/Todo/Get`,
            },
        }
        return await sendRequest<TodoModel[]>(request)
    }

    async getById(id: string): Promise<AsyncApiResponse<TodoModel>> {
        const request = {
            get: {
                path: `${urlAPI}api/Todo/Get/${id}`,
            },
        }
        return await sendRequest<TodoModel>(request)
    }

    async delete(id: string): Promise<AsyncApiResponse<TodoModel>> {
        const request = {
            delete: {
                path: `${urlAPI}api/Todo/${id}`,
            },
        }
        return await sendRequest<TodoModel>(request)
    }
    async create(data: TodoModel): Promise<AsyncApiResponse<TodoModel>> {
        const request = {
            post: {
                path: `${urlAPI}api/Todo/Create`,
                body: data,
            },
        }
        return await sendRequest<TodoModel>(request)
    }
    async update(data: TodoModel): Promise<AsyncApiResponse<TodoModel>> {
        const request = {
            post: {
                path: `${urlAPI}api/Todo/Update`,
                body: data,
            },
        }
        return await sendRequest<TodoModel>(request)
    }

}