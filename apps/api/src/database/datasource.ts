import { TodoEntity } from '@/modules/todo/entities/todo.entity'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'mongodb',
    url: 'mongodb+srv://fayzillo998800:secret_key@cluster0.grbh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    synchronize: true,
    entities: [TodoEntity],
})
