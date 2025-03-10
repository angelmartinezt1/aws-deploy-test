export interface LambdaConfig {
  functionName: string;
  handler: string;
  runtime: string;
  memorySize: number;
  timeout: number;
  environment: {
    STAGE: string;
  };
}

export interface EnvConfig {
  projectName: string;
  region: string;
  lambda: LambdaConfig;
  tags: {
    Environment: string;
    Project: string;
  };
}

export const config: Record<'dev' | 'prod', EnvConfig> = {
  dev: {
    projectName: 'aws-deploy-test-dev',
    region: 'us-east-1',
    lambda: {
      functionName: 'aws-deploy-test-dev',
      handler: 'app.lambda_handler',
      runtime: 'nodejs20.x',
      memorySize: 256,
      timeout: 30,
      environment: { STAGE: 'dev' }
    },
    tags: { Environment: 'Development', Project: 'aws-deploy-test' }
  },
  prod: {
    projectName: 'aws-deploy-test-prod',
    region: 'us-east-1',
    lambda: {
      functionName: 'aws-deploy-test-prod',
      handler: 'app.lambda_handler',
      runtime: 'nodejs20.x',
      memorySize: 512,
      timeout: 30,
      environment: { STAGE: 'prod' }
    },
    tags: { Environment: 'Production', Project: 'aws-deploy-test' }
  }
};
