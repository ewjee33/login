import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({required: true})
  userId: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  consumerId: string;

  @Prop({required: true})
  keyId: string;

  @Prop({required : true})
  isCheater: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);