import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'Apis/V1/user/user.service';
import { AuthService } from './auth.service';
import { ValidatorService } from './validators/check-expiration-time';

describe('AuthService', () => {
  let serviceAuth: AuthService;
  let serviceUserMock = {
    getByMail: jest.fn(),
  };
  let validatorServiceMock = {};
  let jwtServiceMock = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, ValidatorService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue(serviceUserMock)
      .overrideProvider(ValidatorService)
      .useValue(validatorServiceMock)
      .overrideProvider(JwtService)
      .useValue(jwtServiceMock)
      .compile();

    serviceAuth = module.get<AuthService>(AuthService);
  });

  it('>> case defined serivce Auth', () => {
    expect(serviceAuth).toBeDefined();
  });
  it('', () => {});
});
