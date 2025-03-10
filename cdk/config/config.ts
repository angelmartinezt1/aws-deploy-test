// cdk/config/config.ts
export const config = {
  dev: {
    projectName: 'aws-deploy-test-dev',
    // El accountId se obtendrá desde variables de entorno
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
    // El accountId se obtendrá desde variables de entorno
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