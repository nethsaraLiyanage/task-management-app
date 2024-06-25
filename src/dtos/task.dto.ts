import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public status: string;

}
