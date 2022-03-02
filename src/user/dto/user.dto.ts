import { IsBoolean, IsEmail, IsString, MaxLength, MinLength } from "class-validator";


export class CreateUserDTO {

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly name: string;

    @MaxLength(100)
    readonly lastname: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    readonly password: string;

    @IsBoolean()    
    readonly status: boolean;

    @IsString()
    readonly role: string;   
}