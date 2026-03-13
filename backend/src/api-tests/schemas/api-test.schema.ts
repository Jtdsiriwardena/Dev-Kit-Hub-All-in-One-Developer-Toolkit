import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ApiTestDocument = ApiTest & Document;

@Schema({ timestamps: true })
export class ApiTest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  url: string;

  @Prop({
    required: true,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
  method: string;

  @Prop({ type: Object, default: {} })
  headers: Record<string, string>;

  @Prop({ type: Object, default: null })
  body: any;

  @Prop()
  status: number;

  @Prop()
  responseSnippet: string;
}

export const ApiTestSchema = SchemaFactory.createForClass(ApiTest);
