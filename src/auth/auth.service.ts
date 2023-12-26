import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor
        (
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService:JwtService
    ) { }


    async signUp(signUpDto: SignUpDto): Promise<User>{
        try {
            const { name, email, password } = signUpDto

        const isExisting = await this.userModel.findOne({email})
        if (isExisting) {
            throw new UnauthorizedException("Email already registered")
        }

            const hashedPassword = await bcrypt.hash(password, 10)
            
            const user = await this.userModel.create({
                name,
                email,
                password:hashedPassword
            }) 
        return user
        }
        catch (error) {
            return error.message  }
    }

    async login(loginDto:LoginDto): Promise<{ token: string }>{
        
        const { email, password } = loginDto

        const user = await this.userModel.findOne({email})
        if (!user) {
            throw new UnauthorizedException("Invalid password or email")
        }

        const isMatched = await bcrypt.compare(password, user.password)
            if (!isMatched) {
            throw new UnauthorizedException("Invalid password or email")
            }
        
        const token = this.jwtService.sign({ id: user._id })
        return {token}
    }
}
