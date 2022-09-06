import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TECH_CONST } from './technology.const';
import { TechController } from './technology.controller';
import { TechRepository } from './technology.repository';
import { technologySchema } from './technology.schema';
import { technologyService } from './technology.service';

@Module({
  providers: [TechRepository, technologyService],
  imports: [
    MongooseModule.forFeature([
      {
        name: TECH_CONST.MODEL_NAME,
        schema: technologySchema,
      },
    ]),
  ],
  controllers: [TechController],
  exports: [TechRepository],
})
export class TechnologyModule {}
