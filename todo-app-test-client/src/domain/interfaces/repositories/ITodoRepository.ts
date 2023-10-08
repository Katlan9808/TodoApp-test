import { AsyncApiResponse, RequestResultModel } from "../../models/RequestResultModel"
import { TodoModel } from "../../models/TodoModel"


export default interface ITodoRepository {
    get(): Promise<AsyncApiResponse<TodoModel[]>>
    getById(id: string): Promise<AsyncApiResponse<TodoModel>>
    delete(id: string): Promise<AsyncApiResponse<TodoModel>>
    create(data: TodoModel): Promise<AsyncApiResponse<TodoModel>>
    update(data: TodoModel): Promise<AsyncApiResponse<TodoModel>>
}