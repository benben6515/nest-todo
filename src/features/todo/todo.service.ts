import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SearchDto } from '../../core/bases';

import { TodoDocument, TODO_MODEL_TOKEN } from '../../common/models/todo.model';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(TODO_MODEL_TOKEN)
    private readonly todoModel: Model<TodoDocument>,
  ) {}

  public async createTodo(data: CreateTodoDto) {
    const todo = await this.todoModel.create(data);
    return todo?.toJSON();
  }

  public async findTodos(search: SearchDto, select?: any) {
    const { skip, limit } = search;
    const query = this.todoModel.find().select(select);
    const documents = await query.skip(skip).limit(limit).exec();
    return documents.map((document) => document?.toJSON());
  }

  public async deleteTodo(todoId: string) {
    const document = await this.todoModel.findByIdAndRemove(todoId).exec();
    if (!document) {
      return;
    }
    return {};
  }

  public async updateTodo(todoId: string, data: UpdateTodoDto, select?: any) {
    const query = this.todoModel
      .findByIdAndUpdate(todoId, data, { new: true })
      .select(select);
    const document = await query.exec();
    return document?.toJSON();
  }
}
