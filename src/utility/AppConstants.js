const {
  NODE_ENV = 'dev',
  CALCULATOR_API = 'http://localhost:3000/api',
} = window.getClientSideConstants ? window.getClientSideConstants() : {};

export const AppConstants = {
  NODE_ENV,
  CALCULATOR_API,
};