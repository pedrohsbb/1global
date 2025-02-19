import { Controller, Get, Post, Body, Param, Patch, Delete, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { DeviceService } from './device.service';
import { Device } from './device.entity';

@ApiTags('Devices')
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new device' })
  @ApiResponse({ status: 201, description: 'Device successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Smart Sensor X1' },
        brand: { type: 'string', example: 'TechCorp' },
        state: { type: 'string', enum: ['available', 'in-use', 'inactive'], example: 'available' }
      }
    }
  })
  async create(@Body() deviceData: Partial<Device>): Promise<Device> {
    return this.deviceService.create(deviceData);
  }

  @Get()
  async findAll(): Promise<Device[]> {
    return this.deviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Device | null> {
    return this.deviceService.findOne(id);
  }

  @Get('/brand/:brand')
  async findByBrand(@Param('brand') brand: string): Promise<Device[]> {
    return this.deviceService.findByBrand(brand);
  }

  @Get('/state/:state')
  async findByState(@Param('state') state: 'available' | 'in-use' | 'inactive'): Promise<Device[]> {
    return this.deviceService.findByState(state);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<Device>): Promise<Device> {
    return this.deviceService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.deviceService.delete(id);
  }
}
