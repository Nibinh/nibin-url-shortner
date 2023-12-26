import { Body, Controller, Param, Post,Get, UseGuards, Req} from '@nestjs/common';
import { UrlService } from './url.service';
import { Url } from './schema/url.schema';
import { AuthGuard } from '@nestjs/passport';


@Controller('url')
export class UrlController {
    constructor(
        private urlService:UrlService
    ) { }

    @Post('/shortening')
    @UseGuards(AuthGuard()) 
    shortening(@Body() url: Url,
        @Req() req,
    ): Promise<Url>{  
        return this.urlService.shortening(url,req.user)
    }

    @Get('/getone/:shorturl')
    @UseGuards(AuthGuard()) 
    gettingurl(@Param('shorturl') shorturl:string){
        return this.urlService.gettingurl(shorturl)
    }

    @Get('/getall')
    @UseGuards(AuthGuard())
    getallurl():Promise<Url[]> {
        return this.urlService.getAllUrl()
    }
}
