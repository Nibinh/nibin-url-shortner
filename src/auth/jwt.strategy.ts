import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import { Strategy,ExtractJwt } from "passport-jwt";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET
        })
    }

    async validate(payload) {
        const { id } = payload
        const user = await this.userModel.findById(id)
        
        if (!user) {
            throw new UnauthorizedException('login first to access this endpoint')
        }

        return user
    }
} 