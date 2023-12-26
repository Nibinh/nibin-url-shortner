import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlSchema } from './schema/url.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: "Url", schema: UrlSchema }])],
  controllers: [UrlController],
  providers: [UrlService]
})
export class UrlModule {}
