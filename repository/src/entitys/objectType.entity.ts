import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionType } from "./permissionType.entity";

@Entity()
export class ObjectType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @ManyToMany(() => PermissionType)
    @JoinTable({name: "permission"})
    permissionTypes: PermissionType[];
}