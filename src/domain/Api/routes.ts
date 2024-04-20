export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : 'https://loanpro-django-api.apps.bitacoraml.com';

export const SING_IN_URL = `${BASE_URL}/api/v1/sign-in`;
export const OPERATIONS_URL = `${BASE_URL}/api/v1/operations`;
export const RECORD_CREATE_URL = `${BASE_URL}/api/v1/records`;
export const RECORDS_LIST_URL = `${BASE_URL}/api/v1/records`;
export const RECORDS_DELETE_URL = `${BASE_URL}/api/v1/records`;
