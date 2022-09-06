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

  // delete moongose
  DELETE_REFERENCE_EXIST: {
    CODE: 'MG0001',
    MESSAGE:
      'Delete collection is not allowed because collection is referencing another collection',
  },

  // delete aws file
  AWS_FILE_NOT_FOUND: {
    CODE: 'AWS0001',
    MESSAGE: 'File AWS not found',
  },
};
