import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {
  TODO_TITLE_MIN_LENGTH,
  TODO_TITLE_MAX_LENGTH,
  TODO_DESCRIPTION_MAX_LENGTH,
} from '../constants/todo.const';

@Schema({ versionKey: false })
export class Todo {
  @Prop({
    required: true,
    minlength: TODO_TITLE_MIN_LENGTH,
    maxlength: TODO_TITLE_MAX_LENGTH,
  })
  title: string;

  @Prop({
    maxlength: TODO_DESCRIPTION_MAX_LENGTH,
  })
  description: string;

  @Prop({
    required: true,
    // default: false,
  })
  complete: boolean;
}

export type TodoDocument = Todo & Document;

export const TodoSchema = SchemaFactory.createForClass(Todo);
export const TODO_MODEL_TOKEN = Todo.name;
export const TodoDefinition: ModelDefinition = {
  name: TODO_MODEL_TOKEN,
  schema: TodoSchema,
};
