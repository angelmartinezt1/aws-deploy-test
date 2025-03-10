// cdk/config/config.ts
export const config = {
  dev: {
    projectName: 'aws-deploy-test-dev',
    accountId: '123456789012', // Reemplazar con tu ID de cuenta de desarrollo
    region: 'us-east-1',
    lambda: {
      functionName: 'aws-deploy-test-dev',
      handler: 'app.lambda_handler',
      runtime: 'nodejs20.x',
      memorySize: 256,
      timeout: 30,
      environment: {
        STAGE: 'dev'
      }
    },
    tags: {
      Environment: 'Development',
      Project: 'aws-deploy-test'
    }
  },
  prod: {
    projectName: 'aws-deploy-test-prod',
    accountId: '987654321098', // Reemplazar con tu ID de cuenta de producción
    region: 'us-east-1',
    lambda: {
      functionName: 'aws-deploy-test-prod',
      handler: 'app.lambda_handler',
      runtime: 'nodejs20.x',
      memorySize: 512,
      timeout: 30,
      environment: {
        STAGE: 'prod'
      }
    },
    tags: {
      Environment: 'Production',
      Project: 'aws-deploy-test'
    }
  }
};