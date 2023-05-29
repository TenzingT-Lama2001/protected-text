import { HomeRoutes } from '@routes/home/home.route';
import { Application } from 'express';

const BASE_PATH = '/api';

export default (app: Application) => {
  const routes = () => {
    const homeRoutes: HomeRoutes = new HomeRoutes();
    app.use(BASE_PATH, homeRoutes.routes());
  };

  routes();
};
