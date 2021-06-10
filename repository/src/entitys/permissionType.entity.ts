import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType } from "./objectType.entity";

@Entity()
export class PermissionType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @ManyToMany(() => ObjectType)
    @JoinTable({name: "permission"})
    objectTypes: ObjectType[];
    

}