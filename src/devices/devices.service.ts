import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NOTFOUND } from 'dns';
import { Model } from 'mongoose';
import { CreateDeviceDto } from 'src/dto/createdevicedto';
import { DevicesDto } from 'src/dto/devicedto';
import { Updatdevicedto } from 'src/dto/updatedevicedto';
import { Devices } from 'src/schemas/schemas-devices';
import { Users } from 'src/schemas/schemas-users';

@Injectable()
export class DevicesService {
    constructor(@InjectModel(Devices.name)private devicesModel:Model<Devices>,
                @InjectModel(Users.name) private readonly userModel: Model<Users>,){}
//#####################################Create#########################################################################################

async createDevice(userId: string, devicesDto: CreateDeviceDto ): Promise<Devices> {
    const user = await this.userModel.findById(userId);
    if (!user) {
        throw new NotFoundException('User not found');
    }

    const createdDevice = new this.devicesModel(devicesDto);
    await createdDevice.save();

    user.devices.push(createdDevice._id);
    await user.save();
    
    return createdDevice;
}

//##########################################GetAll##########################################################################

async getAllDevices(userId: string): Promise<Devices[]> {
  try {
            console.log(`Retrieving devices for userId: ${userId}`);
            const user = await this.userModel.findById(userId).exec();
            if (!user) {
                throw new Error(`User not found for userId: ${userId}`);
            }
            const devices = await this.devicesModel.find({
                _id: { $in: user.devices }
            }).exec();
            console.log(`Devices found: ${devices.length}`);
            if (devices.length === 0) {
                console.log('No devices found for this user.');
            }
            return devices;
        } catch (error) {
            console.error(`Error retrieving devices: ${error.message}`);
            throw new Error(`Unable to retrieve devices for user ${userId}: ${error.message}`);
        }
    
}

    

//#########################################GetById###########################################################################
async GetByIdDevices(id:string):Promise<Devices>{
    try {
        const existDevices = await this.devicesModel.findById(id).exec()
        if(existDevices){
            return existDevices
        }
        throw new NotFoundException("Device not found")
    } catch (error) {
        throw error
    }
}
async UpdateDevices(Updatedevice:Updatdevicedto,id:string):Promise<Devices>{
    try {
       const updateduser= await this.devicesModel.findByIdAndUpdate(id,Updatedevice)
       if (updateduser) {
        return updateduser

       }
       throw new NotFoundException("Device not found")
    } catch (error) {
        throw error
    }
}



async  DeleteDevices(id: string, iduser: string): Promise<Devices> {
    try {
        // Find the user by id
        const user = await this.userModel.findById(iduser);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const deletedDevice = await this.devicesModel.findByIdAndDelete(id);

        if (!deletedDevice) {
            throw new NotFoundException("Device not found");
        }

        // Remove the device from the user's list of devices
        user.devices.pull(id);
        await user.save();

        return deletedDevice;
    } catch (error) {
        throw error; // Rethrow the error
    }
}
}
