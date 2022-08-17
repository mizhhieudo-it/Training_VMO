import { ResponSchema } from 'Shared/utils/dataRespon_schema';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { customerController } from './customer.controller';
import { Customer } from './customer.scheme';
import { customerService } from './customer.service';
import { ResponSchemaConst } from 'Shared/Common/respon-mess.const';

describe('CustomerController', () => {
  let dataMock: Customer[] = [
    {
      name: 'Thomas Muller',
      descriptions: 'CEO Company LESTRONG',
    },
  ];
  const itemMock: Customer = {
    name: 'John Smith',
    descriptions: 'CEO Company LENA STORE',
  };
  let expectValueCreated = ResponSchema(
    ResponSchemaConst.Schema_Create,
    dataMock.push(itemMock),
  );
  let expectValueGet = ResponSchema(ResponSchemaConst.Schema_Get, dataMock);
  let expectValueDelete = ResponSchema(ResponSchemaConst.Schema_Delete, '');
  let expectValueUpdate = ResponSchema(
    ResponSchemaConst.Schema_Update,
    itemMock,
  );

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
    serviceCustomerMock.GetAllAsync.mockResolvedValue(expectValueGet);
    expect(await controller.GetAllAsync()).toEqual(expectValueGet);
  });
  it('>> case get all list customer failed ', async () => {
    // override
    serviceCustomerMock.GetAllAsync.mockRejectedValue(new Error('error'));
    expect(controller.GetAllAsync()).rejects.toThrow(Error('error'));
  });
  it('>> case test add customer success', async () => {
    serviceCustomerMock.CreateAsync.mockResolvedValue(expectValueCreated);
    expect(await controller.CreateAsync(itemMock)).toBe(expectValueCreated);
  });
  it('>> case test add customer failed ', async () => {
    serviceCustomerMock.CreateAsync.mockRejectedValue(
      new Error('Something went wrong'),
    );
    expect(controller.CreateAsync(itemMock)).rejects.toThrow(
      Error('Something went wrong'),
    );
  });
  it('>> case test remove customer successfully', async () => {
    serviceCustomerMock.RemoveAsync.mockResolvedValue(expectValueDelete);
    expect(await controller.RemoveAsync('1')).toBe(expectValueDelete);
  });

  it('>> case test remove customer failed ', async () => {
    serviceCustomerMock.RemoveAsync.mockRejectedValue(new Error('error'));
    expect(controller.RemoveAsync('1')).rejects.toThrow(Error('error'));
  });
  it('>> case test UPDATE customer Sucessfully ', async () => {
    serviceCustomerMock.UpdateAsync.mockResolvedValue(expectValueUpdate);
    expect(await controller.UpdateAsync('1', itemMock)).toBe(expectValueUpdate);
  });
  it('>> case test UPDATE customer failed ', async () => {
    serviceCustomerMock.UpdateAsync.mockRejectedValue(
      new Error('Something went wrong'),
    );
    expect(controller.UpdateAsync('1', itemMock)).rejects.toThrow(
      Error('Something went wrong'),
    );
  });
});
