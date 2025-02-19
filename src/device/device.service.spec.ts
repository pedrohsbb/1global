import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from './device.service';
import { Device } from './device.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('DeviceService', () => {
  let service: DeviceService;
  let repo: Repository<Device>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        {
          provide: getRepositoryToken(Device),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
    repo = module.get<Repository<Device>>(getRepositoryToken(Device));
  });

  it('should create a new device', async () => {
    const deviceData: Partial<Device> = { name: 'Device 1', brand: 'Brand A', state: 'available' };
    jest.spyOn(repo, 'create').mockReturnValue(deviceData as Device);
    jest.spyOn(repo, 'save').mockResolvedValue(deviceData as Device);

    const result = await service.create(deviceData);
    expect(result).toEqual(deviceData);
  });

  it('should not allow deleting an in-use device', async () => {
    const device = { id: 1, state: 'in-use' } as Device;
    jest.spyOn(service, 'findOne').mockResolvedValue(device);

    await expect(service.delete(1)).rejects.toThrow(BadRequestException);
  });

  it('should return a device by ID', async () => {
    const device = { id: 1, name: 'Device 1' } as Device;
    jest.spyOn(repo, 'findOne').mockResolvedValue(device);

    const result = await service.findOne(1);
    expect(result).toEqual(device);
  });
});
