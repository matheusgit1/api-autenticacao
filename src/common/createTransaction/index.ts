import { GenerateRamdomString } from './createTransaction';
export const createTransaction = () => {
  const random_str = new GenerateRamdomString(30, {
    limits: 'ABCDEFGHIJKLMNOPQRS123456789-',
  });
  return random_str.getRamdonString();
};
