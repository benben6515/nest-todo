import { IsOptional, MaxLength, MinLength } from 'class-validator';
import {
  TODO_DESCRIPTION_MAX_LENGTH,
  TODO_TITLE_MAX_LENGTH,
  TODO_TITLE_MIN_LENGTH,
} from '../../../common/constants/todo.const';

export class CreateTodoDto {
  @MinLength(TODO_TITLE_MIN_LENGTH)
  @MaxLength(TODO_TITLE_MAX_LENGTH)
  public readonly title: string;

  @IsOptional()
  @MaxLength(TODO_DESCRIPTION_MAX_LENGTH)
  public readonly description: string;

  @IsOptional()
  public readonly completed: boolean;
}
