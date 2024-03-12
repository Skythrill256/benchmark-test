import { IsString, IsEmail, IsNotEmpty, IsDefined } from 'class-validator';
export class UserDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;
}

export class UserParamsDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;
}
