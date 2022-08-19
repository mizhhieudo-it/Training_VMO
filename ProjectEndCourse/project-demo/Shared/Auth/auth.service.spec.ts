import { ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDto } from 'Apis/V1/user/dto/UpdateUser.dto';
import { UserService } from 'Apis/V1/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ValidatorService } from './validators/check-expiration-time';
import { Auth_CONST_SPEC } from './auth.const.spec';
import { BadRequestException } from '@nestjs/common';
import { ERROR } from 'Shared/Common/err-code.const';
describe('AuthService', () => {
  let serviceAuth: AuthService;
  let serviceUserMock = {
    getByMail: jest.fn(),
    UpdateAsync: jest.fn(),
  };
  let validatorServiceMock = {
    checkExpirationTime: jest.fn(),
  };
  let jwtServiceMock = {
    signAsync: jest.fn(),
    verify: jest.fn(),
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
  it('>> case login with google auth - Status:  Success', async () => {
    // condition 1
    serviceUserMock.getByMail.mockResolvedValue(
      Auth_CONST_SPEC.userWithGoogleMock,
    );
    // condition 2
    validatorServiceMock.checkExpirationTime.mockResolvedValue(false);
    // condition 3 : don't use
    serviceUserMock.UpdateAsync.mockResolvedValue(
      Auth_CONST_SPEC.userUpdateMock,
    );
    // condition 4 : jwtServiceMock
    const mockJwtToken = 'token_string1111';
    jwtServiceMock.signAsync.mockResolvedValue(mockJwtToken);
    expect(
      await serviceAuth.LoginService(Auth_CONST_SPEC.userLoginDtoGoogleMock),
    ).toStrictEqual({
      ...Auth_CONST_SPEC.expectValueLogin,
      accessToken: mockJwtToken,
      refreshToken: mockJwtToken,
    });
  });
  it('>> case login with local auth - Status: Success', async () => {
    serviceUserMock.getByMail.mockResolvedValue(
      Auth_CONST_SPEC.userWithLocalMock,
    );
    // condition 1 : pass check ExpriTime
    validatorServiceMock.checkExpirationTime.mockResolvedValue(false);
    // condition2 :
    const mockJWTtToken = 'string_token123weqwsdaswqe';
    jwtServiceMock.signAsync.mockResolvedValue(mockJWTtToken);
    serviceUserMock.UpdateAsync.mockResolvedValue(
      Auth_CONST_SPEC.userUpdateMock,
    );
    expect(
      await serviceAuth.LoginService(Auth_CONST_SPEC.userLoginDtoLocalMock),
    ).toStrictEqual({
      ...Auth_CONST_SPEC.expectValueLogin,
      accessToken: mockJWTtToken,
      refreshToken: mockJWTtToken,
    });
  });
  it('>> case login with local auth : Status:Failure - Incorrect Account', async () => {
    serviceUserMock.getByMail.mockResolvedValue(
      Auth_CONST_SPEC.userWithLocalMock,
    );
    // condition 1 : pass check ExpriTime
    validatorServiceMock.checkExpirationTime.mockResolvedValue(false);
    // condition2 :
    const mockJWTtToken = 'string_token123weqwsdaswqe';
    jwtServiceMock.signAsync.mockResolvedValue(mockJWTtToken);
    serviceUserMock.UpdateAsync.mockResolvedValue(
      Auth_CONST_SPEC.userUpdateMock,
    );
    expect(
      serviceAuth.LoginService(Auth_CONST_SPEC.userLoginDtoInCorrectLocalMock),
    ).rejects.toThrow(Error(ERROR.USERNAME_OR_PASSWORD_INCORRECT.MESSAGE));
  });
  it('>> case refresh Token success ', async () => {
    jwtServiceMock.verify.mockResolvedValue(Auth_CONST_SPEC.userWithLocalMock);
    const tokenMock =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZTE2NDM2Mi03Mm';
    jwtServiceMock.signAsync.mockResolvedValue(tokenMock);
    expect(
      await serviceAuth.AutoGenerateToken({
        token: 'sldfkasadsflweqrwqerklksdfafk312werwe',
      }),
    ).toStrictEqual({
      ...Auth_CONST_SPEC.expectAccessToken,
      accessToken: tokenMock,
    });
  });
  it('>> case Refresh Token error ', async () => {
    jwtServiceMock.verify.mockRejectedValue(Auth_CONST_SPEC.expectFaildToken);
    expect(
      serviceAuth.AutoGenerateToken({
        token: 'sldfkasadsflweqrwqerklksdfafk312werwe',
      }),
    ).rejects.toBe(Auth_CONST_SPEC.expectFaildToken);
  });
});
