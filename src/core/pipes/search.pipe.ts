import {
  // ArgumentMetadata,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class SearchPipe implements PipeTransform<Record<string, any>> {
  private readonly DEFAULT_LIMIT = 30;
  private readonly MAX_LIMIT = 50;
  private readonly DEFAULT_SKIP = 0;

  transform(value: Record<string, any> /*, metadata: ArgumentMetadata */) {
    const { limit, skip } = value;
    value.limit = this.setLimit(+limit);
    value.skip = this.setSkip(+skip);
    return value;
  }

  private setLimit(limit: number): number {
    if (!limit) return this.DEFAULT_LIMIT;
    if (limit > this.MAX_LIMIT) return this.MAX_LIMIT;
    return limit;
  }

  private setSkip(skip: number): number {
    if (!skip) return this.DEFAULT_SKIP;
    return skip;
  }
}
