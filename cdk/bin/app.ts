// cdk/bin/app.ts
#!/usr/bin / env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/lambda-stack';

import { env } from 'process';
import { config } from '../config/config';

const app = new cdk.App();

// Determinar el entorno según los parámetros o variables de entorno
const envName = app.node.tryGetContext('env') || process.env.CDK_ENV || 'dev';

// Obtener la configuración específica del entorno
const envConfig = config[envName];

if (!envConfig) {
  throw new Error(`Configuración no encontrada para el entorno: ${envName}`);
}

// Usar el ID de cuenta de las variables de entorno o de los parámetros de contexto
const accountId = app.node.tryGetContext('accountId') ||
  process.env.AWS_ACCOUNT_ID ||
  (envName === 'prod' ? process.env.AWS_ACCOUNT_ID_PROD : process.env.AWS_ACCOUNT_ID_DEV);

if (!accountId) {
  throw new Error(`ID de cuenta de AWS no proporcionado para el entorno: ${envName}. 
  Proporcione mediante CDK_CONTEXT, variables de entorno AWS_ACCOUNT_ID, AWS_ACCOUNT_ID_PROD o AWS_ACCOUNT_ID_DEV.`);
}

// Crear el stack
new LambdaStack(app, `${envConfig.projectName}-stack`, {
  env: {
    account: accountId,
    region: envConfig.region || process.env.AWS_REGION || 'us-east-1'
  },
  projectName: envConfig.projectName,
  lambdaConfig: envConfig.lambda,
  tags: envConfig.tags
});

app.synth();