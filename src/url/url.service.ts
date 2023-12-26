import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schema/url.schema';
import { Model } from 'mongoose';
import {generate} from 'shortid';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class UrlService {
    constructor(
        @InjectModel(Url.name)
        private urlModel:Model<Url>
    ) { }
    

    async shortening(url: Url,user:User): Promise<Url>{
        try {
        const { longurl } = url
        // const data=
        const shorti = await this.urlModel.create({
            longurl,
            shorturl: generate(),
            user:user._id
        })
            return shorti
        }
        catch (error) {
            console.log(error);
            return error
        }
    }
    
    async gettingurl(shorturl: string): Promise< {link:string }>{
        const urls = await this.urlModel.findOne({ shorturl })
        const link = urls.longurl
        return {link}
    }

    async getAllUrl(): Promise<Url[]>{
        const data = await this.urlModel.find().populate('user')

        return data
        
    }
}

