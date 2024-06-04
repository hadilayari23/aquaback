import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [UsersModule , MongooseModule.forRoot("mongodb+srv://hadil:hadil@cluster0.k8nl53t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"), DevicesModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
