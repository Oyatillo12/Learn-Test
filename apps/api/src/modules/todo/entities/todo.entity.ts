import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm'

@Entity()
export class TodoEntity {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    title: string

    @Column()
    isCompleted: boolean
}
