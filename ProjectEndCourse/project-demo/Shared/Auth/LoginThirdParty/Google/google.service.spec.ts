import { ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDto } from 'Apis/V1/user/dto/UpdateUser.dto';
import { UserService } from 'Apis/V1/user/user.service';
import { BadRequestException } from '@nestjs/common';
import { ERROR } from 'Shared/Common/err-code.const';
import { GoogleService } from './google.service';
import { AuthService } from 'Shared/Auth/auth.service';
import { UserRepository } from 'Apis/V1/user/user.repository';
import { Auth_CONST_SPEC } from 'Shared/Auth/auth.const.spec';
describe('Google-Service', () => {
  let serviceGoogle: GoogleService;
  let AuthServiceMock = {
    LoginService: jest.fn(),
  };
  let UserRepositoryMock = {
    findByCodition: jest.fn(),
    store: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserRepository, GoogleService],
    })
      .overrideProvider(AuthService)
      .useValue(AuthServiceMock)
      .overrideProvider(UserRepository)
      .useValue(UserRepositoryMock)
      .compile();

    serviceGoogle = module.get<GoogleService>(GoogleService);
  });

  it('>> case defined serivce Auth', () => {
    expect(serviceGoogle).toBeDefined();
  });
  it('>> case Login with Google Service Success', async () => {
    UserRepositoryMock.findByCodition.mockImplementation(
      (idGoogle: 1234551231) => Auth_CONST_SPEC.userUpdateMock,
    );
    const tokenMock = {
      access_token: 'ACCESS_TOKEN',
      accessTokenExpire: 123456789999,
    };
    const req = {
      user: {
        email: 'test@test.com',
        id: '123453424',
        firstName: 'John',
        lastname: 'Smith',
      },
    };
    AuthServiceMock.LoginService.mockResolvedValue(tokenMock);
    expect(await serviceGoogle.signInWithGoogle(req)).toBe(tokenMock);
  });
  it('>> case Login with Google Service Failure - Incorrect req', async () => {
    UserRepositoryMock.findByCodition.mockResolvedValue(
      Auth_CONST_SPEC.userUpdateMock,
    );
    const tokenMock = {
      access_token: 'ACCESS_TOKEN',
      accessTokenExpire: 123456789999,
    };
    const req = {};
    AuthServiceMock.LoginService.mockResolvedValue(tokenMock);
    expect(serviceGoogle.signInWithGoogle(req)).rejects.toThrow(
      Error('Bad Request'),
    );
  });
  it('>> Case Login with Google but does not connected to Google', () => {
    const req = {
      user: {
        email: 'test@test.com',
        id: '123453424',
        firstName: 'John',
        lastname: 'Smith',
      },
    };
    UserRepositoryMock.findByCodition
      .mockReturnValueOnce(null)
      .mockResolvedValue(Auth_CONST_SPEC.userUpdateMock);

    expect(serviceGoogle.signInWithGoogle(req)).rejects.toThrow(
      Error(
        "User already exists, but Google account was not connected to user's account",
      ),
    );
  });
  it('>> Case Login with Google When not save account in Db', async () => {
    const req = {
      user: {
        email: 'test@test.com',
        id: '123453424',
        firstName: 'John',
        lastname: 'Smith',
      },
    };
    const tokenMock = {
      access_token: 'ACCESS_TOKEN',
      accessTokenExpire: 123456789999,
    };
    UserRepositoryMock.findByCodition
      .mockReturnValueOnce(null)
      .mockResolvedValue(null);
    AuthServiceMock.LoginService.mockResolvedValue(tokenMock);
    await UserRepositoryMock.store({});
    expect(await serviceGoogle.signInWithGoogle(req)).toBe(tokenMock);
  });
});
