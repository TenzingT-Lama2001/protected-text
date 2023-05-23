import { AboutRoutes } from '@routes/about/about.route';
import { AuthRoutes } from '@routes/auth/auth.route';
import { HomeRoutes } from '@routes/home/home.route';
import { TextRoutes } from '@routes/text/text.route';
import { WebsiteRoutes } from '@routes/website/website.route';
import { Application } from 'express';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    const aboutRoutes: AboutRoutes = new AboutRoutes();
    const homeRoutes: HomeRoutes = new HomeRoutes();
    const websiteRoutes: WebsiteRoutes = new WebsiteRoutes();
    const textRoutes: TextRoutes = new TextRoutes();
    const authRoutes: AuthRoutes = new AuthRoutes();
    app.use(BASE_PATH, homeRoutes.routes());
    app.use(BASE_PATH, aboutRoutes.routes());
    app.use(BASE_PATH, websiteRoutes.routes());
    app.use(BASE_PATH, textRoutes.routes());
    app.use(BASE_PATH, authRoutes.routes());
  };

  routes();
};
