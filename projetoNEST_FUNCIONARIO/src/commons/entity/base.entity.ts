import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  constructor(data: Partial<BaseEntity> = {}) {
    Object.assign(this, data);
  }
}
