import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDto } from 'Apis/V1/user/dto/UpdateUser.dto';
import { UserService } from 'Apis/V1/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ValidatorService } from './validators/check-expiration-time';

describe('AuthService', () => {
  let serviceAuth: AuthService;
  let userLoginDtoGoogleMock: LoginDto = {
    username: 'minhhieudo.it@gmail.com',
    password: '-',
  };
  let userWithGoogleMock = {
    _id: '62f46d5060d156ed4485c471',
    userId: '1de750c5-0214-4638-ab16-29fe2a4860a3',
    name: 'HiếuĐỗ Minh',
    email: 'minhhieudo.it@gmail.com',
    password: '-',
    issuedBy: '',
    issuedDate: '',
    daysInTrial: '',
    isEmailConfirmed: true,
    roles: ['user'],
    idGoogle: '110615788478010332810',
    __v: 0,
  };
  let expectValueLogin = {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZGU3NTBjNS0wMjE0LTQ2MzgtYWIxNi0yOWZlMmE0ODYwYTMiLCJlbWFpbCI6Im1pbmhoaWV1ZG8uaXRAZ21haWwuY29tIiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE2NjA3OTAyMzcsImV4cCI6MTY2MzM4MjIzN30.HT3hpEtyVoEXU0CyuqUCAn4vHg4ZYuRw3S6klSDJyWo',
    accessTokenExpire: 2592000,
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZGU3NTBjNS0wMjE0LTQ2MzgtYWIxNi0yOWZlMmE0ODYwYTMiLCJlbWFpbCI6Im1pbmhoaWV1ZG8uaXRAZ21haWwuY29tIiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE2NjA3OTAyMzcsImV4cCI6MTY3MzM4MjIzN30.DuE3GBVaNwgbbXulhD7qJjMdT_HQT3CjX39yJpS6wNw',
    refreshTokenExpire: 12592000,
  };
  let serviceUserMock = {
    getByMail: jest.fn(),
    UpdateAsync: jest.fn(),
  };
  let validatorServiceMock = {
    checkExpirationTime: jest.fn(),
  };
  let jwtServiceMock = {
    signAsync: jest.fn(),
  };

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
  it('>> case login with google auth  success', async () => {
    // condition 1
    serviceUserMock.getByMail.mockResolvedValue(userWithGoogleMock);
    // condition 2
    validatorServiceMock.checkExpirationTime.mockResolvedValue(false);
    // condition 3 : don't use
    serviceUserMock.UpdateAsync.mockResolvedValue({
      userId: '1de750c5-0214-4638-ab16-29fe2a4860a3',
      name: 'HiếuĐỗ Minh',
      email: 'minhhieudo.it@gmail.com',
      password: '-',
      issuedBy: '',
      issuedDate: '',
      daysInTrial: '',
      isEmailConfirmed: true,
      roles: ['user'],
      idGoogle: '110615788478010332810',
      createdAt: '2022-08-11T02:45:36.341Z',
      updatedAt: '2022-08-11T09:12:44.699Z',
    });
    expect(await serviceAuth.LoginService(userLoginDtoGoogleMock)).toBe(
      expectValueLogin,
    );
  });
});
