import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export enum Type {
    Sensor = 'sensor',
    Actuator = 'actuator',
  }
  
@Schema()
export class Devices extends Document {
@Prop({required:true})
name:string;
@Prop({required:true ,unique:true})
deveui:string;
@Prop({required:true})
type:Type;
@Prop({required:false})
onoff?:string;

}
export const DevicesSchemas=SchemaFactory.createForClass(Devices)