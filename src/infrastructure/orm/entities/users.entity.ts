import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import * as bcript from 'bcrypt';

@Entity({ name: 'tb_user' })
@Injectable()
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { name: 'co_name', nullable: false })
  name: string;

  @Column('varchar', { name: 'co_email', unique: true, nullable: false })
  email: string;

  @Column('varchar', { name: 'co_phone', nullable: false })
  phone: string;

  @Column('varchar', { name: 'co_document', nullable: false })
  document: string;

  @Column('varchar', { name: 'co_password', nullable: false })
  password: string;

  @Column('varchar', { name: 'co_resete_password_token', nullable: true })
  resetePasswordToken?: string;

  @Column('timestamp', {
    name: 'co_resete_password_token_expire',
    nullable: true,
  })
  resetePasswordTokenExpireIn?: Date;

  @CreateDateColumn({ name: 'co_created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'co_updated_at' })
  updatedAt?: Date;

  @Column({ name: 'co_is_verified', nullable: true, default: false })
  isVerified?: boolean;

  @Column({ name: 'co_verify_code', nullable: true, default: null })
  verifyCode?: string;

  @Column({
    name: 'co_verify_code_expire_in',
    nullable: true,
    default: new Date(new Date().setHours(new Date().getHours() + 1)),
  })
  verifyCodeExpireIn?: Date;

  @BeforeInsert()
  hashInsertPassword() {
    this.password = bcript.hashSync(this.password, +process.env.GEN_SALT);
  }
}
