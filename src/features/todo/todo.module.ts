import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoDefinition } from '../../common/models/todo.model';

import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  imports: [MongooseModule.forFeature([TodoDefinition])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
