import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schema/user.schema";



@Schema({
    timestamps:true
})

export class Url {
    @Prop()
    longurl: string

    @Prop({ unique:[true,'Duplicate url entered']})
    shorturl: string
    
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    user:User
}

export const UrlSchema=SchemaFactory.createForClass(Url)