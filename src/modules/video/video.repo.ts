import { Injectable } from '@nestjs/common';
import { Video, VideoDocument } from './video.schema';
import mongoose, { Model } from 'mongoose';
import { IVideo } from './types/index';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VideosRepo {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  // async createVideo(
  //   createVideoDto: CreateVideoDto,
  //   accountId: mongoose.Types.ObjectId,
  //   videoId: mongoose.Types.ObjectId,
  //   videoTitle: string,
  //   videoDescription: string,
  //   session?: mongoose.ClientSession,
  // ): Promise<IVideo> {
  //   const video = new this.videoModel({
  //     ...createVideoDto,
  //     accountId,
  //     videoId,
  //     videoTitle,
  //     videoDescription,
  //   });

  //   return video.save();
  // }

  async updateVideo(
    videoId: mongoose.Types.ObjectId,
    videoTitle: string,
    videoDescription: string,
  ): Promise<IVideo> {
    return this.videoModel
      .findByIdAndUpdate(videoId, {
        videoTitle,
        videoDescription,
      })
      .lean();
  }

  // async saveVideo(
  //   editVideoDto: EditVideoDto,
  //   videoId: mongoose.Types.ObjectId,
  //   // session?: mongoose.ClientSession,
  // ): Promise<IVideo> {
  //   const video = await this.videoModel.findById(videoId);
  //   Object.assign(video, editVideoDto);

  //   return video.save();
  // }

  async findById(id: mongoose.Types.ObjectId): Promise<IVideo> {
    return this.videoModel.findById(id).lean();
  }

  async findByAccountId(accountId: mongoose.Types.ObjectId): Promise<IVideo[]> {
    return this.videoModel
      .find({
        accountId,
      })
      .lean();
  }
}
