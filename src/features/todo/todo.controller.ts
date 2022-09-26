import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard, RoleGuard } from '../../core/guards';
import { SearchPipe } from '../../core/pipes';
import { SearchDto } from '../../core/bases';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { TodoService } from './todo.service';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(@Query(SearchPipe) query: SearchDto) {
    return this.todoService.findTodos(query);
  }

  @Post()
  async createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(dto);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    const response = await this.todoService.deleteTodo(id);
    if (!response) throw new ForbiddenException();
    return response;
  }

  @Patch(':id')
  async updateTodo(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    const todo = await this.todoService.updateTodo(id, dto);
    if (!todo) throw new ForbiddenException();
    return todo;
  }
}
