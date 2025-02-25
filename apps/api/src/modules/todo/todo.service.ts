import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { TodoEntity } from './entities/todo.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { IResponse, ISuccessRes } from './todo.types'

@Injectable()
export class TodoService {
    logger: Logger
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>
    ) {}

    create = async (
        createTodoDto: CreateTodoDto
    ): Promise<IResponse<ISuccessRes>> => {
        try {
            const todo = await this.todoRepository.create(createTodoDto)
            await this.todoRepository.save(todo)
            return {
                success: true,
                message: 'Successfully created',
            }
        } catch (err) {
            throw new HttpException(JSON.stringify(err), HttpStatus.BAD_REQUEST)
        }
    }

    findAll = async (): Promise<IResponse<TodoEntity[]>> => {
        const todos = await this.todoRepository.find({
            order: {},
        })
        return {
            success: true,
            data: todos,
        }
    }

    findOne = async (id: string): Promise<IResponse<TodoEntity>> => {
        try {
            const todo = await this.todoRepository.findOneBy({
                _id: new ObjectId(id),
            })
            return {
                success: true,
                data: todo!,
            }
        } catch (err: Error | unknown) {
            throw new HttpException(JSON.stringify(err), HttpStatus.NOT_FOUND)
        }
    }

    update = async (
        id: string,
        updateTodoDto: CreateTodoDto
    ): Promise<IResponse<TodoEntity>> => {
        try {
            const result = await this.todoRepository.update(id, updateTodoDto)

            if (!result.affected) {
                return {
                    success: false,
                    message: 'Todo not found or not updated',
                }
            }
            return { success: true, message: 'Todo updated successfully' }
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST)
        }
    }

    updateIsComplete = async (
        id: string,
        status: boolean
    ): Promise<IResponse<TodoEntity>> => {
        try {
            const result = await this.todoRepository.update(id, {
                isCompleted: status,
            })

            if (!result.affected) {
                return {
                    success: false,
                    message: 'Todo not found or not updated',
                }
            }
            return { success: true, message: 'Todo updated successfully' }
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST)
        }
    }

    remove = async (id: string): Promise<IResponse<ISuccessRes>> => {
        try {
            const result = await this.todoRepository.delete(id)

            if (!result.affected) {
                return {
                    success: false,
                    message: 'Todo not deleted',
                }
            }

            return {
                success: true,
                message: 'Todo deleted',
            }
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST)
        }
    }
}
