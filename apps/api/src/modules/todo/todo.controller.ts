import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@ApiTags('todos')
@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    create(@Body() createTodoDto: CreateTodoDto) {
        return this.todoService.create(createTodoDto)
    }

    @Get()
    findAll() {
        return this.todoService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todoService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todoService.update(id, updateTodoDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todoService.remove(id)
    }

    @Put('complete/:id')
    updateIsComplete(
        @Param('id') id: string,
        @Body() body: { status: boolean }
    ) {
        return this.todoService.updateIsComplete(id, body.status)
    }
}
