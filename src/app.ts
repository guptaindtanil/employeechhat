import express, { Application } from 'express';
import { resolve } from 'path';
import cors from 'cors';
import {connect as mongoConnect} from '@config/database/mongo';
import bearerToken from 'express-bearer-token';
import { v1Router } from './routes';
import { handleError } from '@config/handleErrors/handleError';
import { errors } from 'celebrate';
import { morganConf } from '@config/logger/logger';
import * as i18n from 'i18n';


class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setHeaders();
    this.initializeI18n();
    this.initializeMiddleware();
    this.initializeDBConnection();
    this.initializeRoutes();
    this.overrideExpressResponse();
  }

  /**
   * Initilization of internationalization(i18n)
   * default language english.
   */
  private initializeI18n(): void {
    i18n.configure({
      locales: ['en'],
      directory: resolve(__dirname, './assets/locales'),
    });
    this.app.use(i18n.init);
  }

  /**
   * All express middleware goes here
   * `body-parser` = parsing request body
   * `bearerToken` = For `Basic Auth` token
   */
  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(bearerToken());
    this.app.use(morganConf);
  }

  /**
   * Basic header configuartion
   * It is recomanded to update this section, depending on application's needs.
   * Security Attention: Take a special care of `Allow-Origin` for production
   * `Access-Control-Allow-Origin` - * or forward request origin not recomanded in production
   */
  private setHeaders(): void {
    this.app.use(cors());
  }

  /**
   * Handaling database connection
   * In this application we are using only MongoDB with helper lib `mongoose`
   */
  private initializeDBConnection(): void {
    mongoConnect();
  }

  /**
   * Overriding the express response.
   * ok = 200
   * created = 201
   * noData = 204
   * badRequest = 400
   * forbidden = 403
   * severError = 500
   */
  private overrideExpressResponse(): void {
    this.app.use(errors());
    this.app.use(handleError);
  }

  /**
   * Initializing APIs base routes.
   * APIs base path also depends on server proxy configuration.
   */
  private initializeRoutes() {
    this.app.use('/api/v1', v1Router);
  }
}

/**
 * Export the application.
 * We made it singletone to avoid accidental double invokation.
 */
export default new App().app;
