import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString({
        message: 'Le nom doit être une chaîne de caractères',
    })
    name: string

    @IsEmail({}, {
        message: 'L\'email n\'est pas valide',
    })
    email: string

    @IsString({
        message: 'Le numéro de téléphone doit être une chaîne de caractères',
    })
    phone: string

    @IsString({
        message: 'Le mot de passe doit être une chaîne de caractères',
    })
    password: string
}