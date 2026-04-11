import { Module } from '@nestjs/common';
import { FeaturesService } from 'src/features/providers/features.service';
import { FeaturesController } from 'src/features/features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from 'src/features/entities/feature.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Module({
  controllers: [FeaturesController],
  providers: [FeaturesService, PaginationProvider],
  imports: [TypeOrmModule.forFeature([Feature])],
})
export class FeaturesModule {}
