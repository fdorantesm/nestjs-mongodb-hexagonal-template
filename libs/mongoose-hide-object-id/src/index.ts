import { Schema } from 'mongoose';

export function mongooseHideObjectId(schema: Schema): void {
  schema.set('toJSON', {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.id;
      delete ret.__v;
    },
  });
  schema.set('toObject', {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.id;
      delete ret.__v;
    },
  });
}
