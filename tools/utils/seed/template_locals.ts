import * as util from 'gulp-util';
import { argv } from 'yargs';
import { join } from 'path';

import * as CONFIG from '../../config';

const getConfig = (path: string, env: string): any => {
  const suffixPath = join(path, `${env}.config.js`);
  const simplePath = join(path, `${env}.js`);
  const config: any = [suffixPath, simplePath]
    .reduce((config: any, path: string) => {
      if (config) {
        return config;
      }
      try {
        config = require(path);
      } catch (e) {
        return null;
      }
      return config;
    }, null);
  if (!config) {
    util.log(util.colors.red(`Cannot find ${suffixPath}, neither ${simplePath}`));
  }
  return config;
};

/**
 * Returns the project configuration (consisting of the base configuration provided by seed.config.ts and the additional
 * project specific overrides as defined in project.config.ts)
 */
export function templateLocals() {
  const configEnvName = argv['config-env'] || 'dev';
  const configPath = CONFIG.getPluginConfig('environment-config');
  const baseConfig = getConfig(configPath, 'base');
  const config = getConfig(configPath, configEnvName);

  if (!config) {
    throw new Error('Invalid configuration name');
  }

  return Object.assign(CONFIG, {
    ENV_CONFIG: JSON.stringify(Object.assign(baseConfig, config))
  });
}

