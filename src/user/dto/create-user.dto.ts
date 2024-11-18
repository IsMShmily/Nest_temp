import { IsArray, IsNotEmpty, IsString, Length } from 'class-validator';
import { Roles } from 'src/roles/roles.entity';

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  userName: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;

  @IsArray()
  roles?: Roles[] | number[];
}
