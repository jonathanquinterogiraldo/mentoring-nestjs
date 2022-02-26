import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    status: boolean

    @Column()
    role: string

}