import { Schema } from 'mongoose';

export type ModelInstance = {
  name: string;
  schema: Schema<any>;
};
