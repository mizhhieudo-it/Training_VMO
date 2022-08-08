export interface LoginResponseDto {
    accessToken: string;
    accessTokenExpire?: number | string;
    refreshToken?: string;
    refreshTokenExpire?: number | string;

}