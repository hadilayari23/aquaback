import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Devices } from 'src/schemas/schemas-devices';
import { DevicesDto } from 'src/dto/devicedto';
import { Updateuserdto } from 'src/dto/updateuserdto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/schemas/schemas-users';
import { CreateDeviceDto } from 'src/dto/createdevicedto';
import { Updatdevicedto } from 'src/dto/updatedevicedto';

@Controller('devices')
export class DevicesController {
    constructor(private deviceservice:DevicesService){}

    //create

    @Roles(Role.Admin)
    @Post(':iduser/add')
    async create(
        @Param('iduser') userId: string,
        @Body() devicesDto: CreateDeviceDto ,
        @Res() res
    ): Promise<Devices> {
        try {
            const createdDevice = await this.deviceservice.createDevice(userId, devicesDto);
            return res.status(HttpStatus.CREATED).json({message:'Device created successfully', data:createdDevice})
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error', error: error.message });
        }
    }

    //getall

    @Get(':userId/all') // Vous devez utiliser ':userId' pour correspondre à la route
    async getAll(@Param('userId') userId: string,@Res() res): Promise<{ message: string, data: any }> {
        try {
            const existingDevices = await this.deviceservice.getAllDevices(userId);
            return res.status(HttpStatus.OK).json({ message: 'Devices retrieved successfully', data: existingDevices });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error', error: error.message });
        }
    }

    //getbyid

@Get(':id')
async getById(@Param('id') id: string , @Res()res):Promise<Devices>{
    try {
       const existuser=await this.deviceservice.GetByIdDevices(id)
        return res.status(HttpStatus.OK).json({message:"sucess",data:existuser})
    } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({message:"Error",error:error.message})

    }
}

//update

@Roles(Role.Admin)
@Put(':id')
async UpdateById(@Body()Updatdevicedto:Updatdevicedto,@Param('id') id: string , @Res()res):Promise<Devices>{
    try {
       const existuser=await this.deviceservice.UpdateDevices(Updatdevicedto,id)
        return res.status(HttpStatus.OK).json({message:"Sucess !",data:existuser})
    } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({message:"Error",error:error.message})

    }
}
//delete

@Roles(Role.Admin)
@Delete(':iduser/:id')
async DeleteById(@Param('id') id: string, @Param('iduser') iduser: string, @Res() res): Promise<Devices> {
    try {
        const existuser = await this.deviceservice.DeleteDevices(id, iduser);
        return res.status(HttpStatus.OK).json({ message: "Success!", data: existuser });
    } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "Error", error: error.message });
    }
}

}
