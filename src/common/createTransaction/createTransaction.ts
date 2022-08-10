import { randomStringService } from './randomStringService';

export interface IBufferOptions {
  limits?: string;
}

export class GenerateRamdomString {
  public defaultLimits =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"!@#$%¨&*()-+=[]{};:?';

  public defaultNumberLimits = '0123456789';

  size: number;
  options: IBufferOptions;
  randomStringService: randomStringService;

  public constructor(size?: number, options?: IBufferOptions) {
    this.size = size || 21;
    this.options = options;
    this.randomStringService = new randomStringService(this.defaultLimits);
  }

  public generateUUID() {
    return this.randomStringService.UUID();
  }

  public getRamdonString(): string {
    return this.randomStringService.getRandomString(this.size, this.options);
  }
}
