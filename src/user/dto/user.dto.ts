export class CreateUserDTO {
    readonly name: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly status: boolean;
    readonly role: string;   
}