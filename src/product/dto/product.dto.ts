import { IsString, MinLength, MaxLength, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateProductDTO {

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly name: string;

    @IsOptional()
    @MaxLength(300)
    readonly description: string;

    @IsString()
    @IsOptional()
    readonly imageURL: string;

    @IsNumber()
    @Min(1)
    @Max(5000)
    readonly price: number;

    readonly createdAt: Date;
}