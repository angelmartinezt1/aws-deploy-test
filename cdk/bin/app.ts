// cdk/bin/app.ts
#!/usr/bin / env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/lambda-stack';
import { config } from '../config/config';
import { env } from 'process';

const app = new cdk.App();

// Determinar el entorno según los parámetros o variables de entorno
const envName = app.node.tryGetContext('env') || process.env.CDK_ENV || 'dev';

// Obtener la configuración específica del entorno
const envConfig = config[envName];

if (!envConfig) {
  throw new Error(`Configuración no encontrada para el entorno: ${envName}`);
}

// Crear el stack
new LambdaStack(app, `${envConfig.projectName}-stack`, {
  env: {
    account: envConfig.accountId,
    region: envConfig.region
  },
  projectName: envConfig.projectName,
  lambdaConfig: envConfig.lambda,
  tags: envConfig.tags
});

app.synth();