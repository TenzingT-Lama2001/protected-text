import { aboutRoutes } from '@routes/about/about.route';
import { homeRoutes } from '@routes/home/home.route';
import { textRoutes } from '@routes/text/text.route';
import { websiteRoutes } from '@routes/website/website.route';
import { Application } from 'express';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, homeRoutes.routes());
    app.use(BASE_PATH, aboutRoutes.routes());
    app.use(BASE_PATH, websiteRoutes.routes());
    app.use(BASE_PATH, textRoutes.routes());
  };

  routes();
};
