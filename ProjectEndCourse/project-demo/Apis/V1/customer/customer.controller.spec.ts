import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { customerController } from './customer.controller';
import { Customer } from './customer.scheme';
import { customerService } from './customer.service';

describe('CustomerController', () => {
  let dataMock: Customer[] = [
    {
      name: 'Thomas Muller',
      descriptions: 'CEO Company LESTRONG',
    },
  ];
  let controller: customerController;
  let serviceCustomerMock = {
    CreateAsync: jest.fn(),
    GetById: jest.fn((id: string) => {}),
    UpdateAsync: jest.fn(),
    RemoveAsync: jest.fn(),
    GetAllAsync: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [customerController],
      providers: [customerService],
    })
      .overrideProvider(customerService)
      .useValue(serviceCustomerMock)
      .compile();

    controller = module.get<customerController>(customerController);
  });

  it('>> case defined controller Customer', () => {
    expect(controller).toBeDefined();
  });
  it('>> case check function get all customer', async () => {
    serviceCustomerMock.GetAllAsync.mockResolvedValue(dataMock);
    expect(await controller.GetAllAsync()).toEqual(dataMock);
  });
  it('>> case get all list customer failed ', async () => {
    // override
    serviceCustomerMock.GetAllAsync.mockRejectedValue(new Error('error'));
    expect(controller.GetAllAsync()).rejects.toThrow(Error('error'));
  });
  it('', () => {});
});
