import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Field()
	@Column("varchar", { length: 255, unique: true })
	username: string;

	@Field()
	@Column("varchar", { length: 255, unique: true })
	email: string;

	@Column("text")
	password: string;

	@Column("bool", { default: true })
	confirmed: boolean;
}
