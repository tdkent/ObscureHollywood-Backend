import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { TagsController } from 'src/tags/tags.controller';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagsModule {}
