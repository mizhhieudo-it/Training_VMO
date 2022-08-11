export const ERROR = {
  COMMON_SYSTEM_ERROR: {
    CODE: 'sys00001',
    MESSAGE:
      'An error has arisen from the system. Please try again later or contact us for a fix.',
  },

  // user
  USER_NOT_FOUND: {
    CODE: 'us00001',
    MESSAGE: 'User not found, disabled or locked',
  },
  USERNAME_OR_PASSWORD_INCORRECT: {
    CODE: 'us00002',
    MESSAGE: 'Username or password is incorrect',
  },
  USERID_EXISTED: {
    CODE: 'us00003',
    MESSAGE: 'UserId already existed',
  },
  EMAIL_EXISTED: {
    CODE: 'us00004',
    MESSAGE: 'Email already existed',
  },
  EMAIL_NOT_ACTIVE: {
    CODE: 'us00005',
    MESSAGE: 'account not activated',
  },
};
