/* eslint-disable class-methods-use-this */
export class HomeService {
  public async getHome(): Promise<string> {
    return 'this is home page';
  }
}

export const homeService: HomeService = new HomeService();
