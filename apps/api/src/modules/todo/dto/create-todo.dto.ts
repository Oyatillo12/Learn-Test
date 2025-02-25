import { ApiProperty } from '@nestjs/swagger'

export class CreateTodoDto {
    @ApiProperty()
    title: string

    @ApiProperty()
    isCompleted: boolean
}
