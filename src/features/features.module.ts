import { Module } from '@nestjs/common';
import { FeaturesService } from 'src/features/providers/features.service';
import { FeaturesController } from 'src/features/features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from 'src/features/entities/feature.entity';

@Module({
  controllers: [FeaturesController],
  providers: [FeaturesService],
  imports: [TypeOrmModule.forFeature([Feature])],
})
export class FeaturesModule {}
