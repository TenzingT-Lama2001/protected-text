/* eslint-disable class-methods-use-this */
export class AboutService {
  public async getAbout(): Promise<string> {
    return 'this is about page';
  }
}

export const aboutService: AboutService = new AboutService();
