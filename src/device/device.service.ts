import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  async create(deviceData: Partial<Device>): Promise<Device> {
    const device = this.deviceRepo.create(deviceData);
    return this.deviceRepo.save(device);
  }

  async findAll(): Promise<Device[]> {
    return this.deviceRepo.find();
  }

  async findOne(id: number): Promise<Device | null> {
    return await this.deviceRepo.findOne({ where: { id } }) || null;
  }

  async findByBrand(brand: string): Promise<Device[]> {
    return await this.deviceRepo.find({ where: { brand } });
  }

  async findByState(state: 'available' | 'in-use' | 'inactive'): Promise<Device[]> {
    return await this.deviceRepo.find({ where: { state } });
  }

  async update(id: number, updateData: Partial<Device>): Promise<Device> {
    const device = await this.findOne(id);
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    if (updateData.createdAt) {
      throw new BadRequestException('Creation time cannot be updated');
    }
    if (device.state === 'in-use' && (updateData.name || updateData.brand)) {
      throw new BadRequestException('Cannot update name or brand of an in-use device');
    }
    await this.deviceRepo.update(id, updateData);
    return this.deviceRepo.findOne({ where: { id } }) as Promise<Device>;
  }

  async delete(id: number): Promise<void> {
    const device = await this.findOne(id);
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    if (device.state === 'in-use') {
      throw new BadRequestException('Cannot delete an in-use device');
    }
    await this.deviceRepo.delete(id);
  }
}
