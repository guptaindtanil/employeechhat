import 'module-alias/register';
import app from './app';
import { envs } from '@config/env';
import { logger } from '@config/logger/logger';

app.listen(envs.port, (): any => {
  logger.info(`Express server listening on port ${envs.port}`);
});
