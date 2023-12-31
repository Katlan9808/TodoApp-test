import { TodoModel } from "../../domain/models/TodoModel";
import TodoRepository from "../repositories/TodoRespository";

const repository = new TodoRepository()

export class TodoController {
    static async get() {
        return await repository.get();
    }

    static getById(id: string) {
        return repository.getById(id).then(res => res);
    }

    static async create(data: TodoModel) {
        return await repository.create(data);
    }

    static async update(data: TodoModel) {
        return await repository.update(data);
    }

    static async delete(id: string) {
        return await repository.delete(id);
    }
}