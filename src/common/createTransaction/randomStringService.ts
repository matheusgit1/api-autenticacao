import { IBufferOptions } from './createTransaction';

export class randomStringService {
  limits: string;

  public constructor(limits?: string) {
    this.limits = limits;
  }

  public getRandomString(size: number, options?: IBufferOptions): string {
    try {
      let random_string = '';

      if (options.limits) {
        for (let i = 0; i <= size - 1; i++) {
          random_string +=
            options.limits[Math.floor(Math.random() * options.limits.length)];
        }
        return random_string;
      }

      for (let i = 0; i <= size - 1; i++) {
        random_string +=
          this.limits[Math.floor(Math.random() * this.limits.length)];
      }
      return random_string;
    } catch (error: any) {
      throw error;
    }
  }

  public UUID(): string {
    try {
      let dt = new Date().getTime();
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          const r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        },
      );
      return uuid;
    } catch (error: any) {
      throw error;
    }
  }

  private removeCharsFromString(phrase: string, exeptions: string): string {
    const random_string_without_exeception: string = phrase;
    for (let i = 0; i <= random_string_without_exeception.length - 1; i++) {
      for (let j = 0; j < exeptions.length - 1; j++) {
        if (random_string_without_exeception[i] == exeptions[j]) {
          random_string_without_exeception.replace(exeptions[j], '');
        }
      }
    }

    return random_string_without_exeception;
  }
}
