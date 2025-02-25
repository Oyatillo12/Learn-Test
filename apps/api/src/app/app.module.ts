import { Module } from '@nestjs/common'
import { TodoModule } from '@/modules/todo/todo.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodoEntity } from '@/modules/todo/entities/todo.entity'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: 'mongodb+srv://fayzillo998800:secret_key@cluster0.grbh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
            entities: [TodoEntity],
            synchronize: true,
            useUnifiedTopology: true,
        }),
        TodoModule,
    ],
    // providers: [{
    //   provide: DataSource,
    //   useFactory: async () => {
    //     const logger = new Logger()

    //     try {
    //       if (!AppDataSource.isInitialized) {
    //         await AppDataSource.initialize()
    //       }

    //       logger.log('Datasource has initialized')

    //       return AppDataSource
    //     } catch (err) {
    //       logger.error('Error during datasource initialization', err);
    //       process.exit()
    //     }

    //   }
    // }]
})
export class AppModule {}
