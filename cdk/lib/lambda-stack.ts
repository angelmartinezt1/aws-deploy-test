// cdk/lib/lambda-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import * as path from 'path';

interface LambdaStackProps extends cdk.StackProps {
  projectName: string;
  lambdaConfig: {
    functionName: string;
    handler: string;
    runtime: string;
    memorySize: number;
    timeout: number;
    environment: { [key: string]: string };
  };
  tags?: { [key: string]: string };
}

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    // Definir el grupo de logs para la función Lambda
    const logGroup = new logs.LogGroup(this, 'LambdaLogGroup', {
      logGroupName: `/aws/lambda/${props.lambdaConfig.functionName}`,
      retention: logs.RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // Definir la función Lambda
    const lambdaFunction = new lambda.Function(this, 'LambdaFunction', {
      functionName: props.lambdaConfig.functionName,
      runtime: lambda.Runtime.of(props.lambdaConfig.runtime),
      handler: props.lambdaConfig.handler,
      code: lambda.Code.fromAsset(path.join(__dirname, '../../')),
      memorySize: props.lambdaConfig.memorySize,
      timeout: cdk.Duration.seconds(props.lambdaConfig.timeout),
      environment: props.lambdaConfig.environment,
      currentVersionOptions: {
        description: `Deployed at ${new Date().toISOString()}`,
        removalPolicy: cdk.RemovalPolicy.RETAIN,
      },
    });

    // Aplicar etiquetas a la función
    if (props.tags) {
      for (const [key, value] of Object.entries(props.tags)) {
        cdk.Tags.of(lambdaFunction).add(key, value);
      }
    }

    // Crear alias para la función Lambda (prod, stage, etc.)
    const prodAlias = new lambda.Alias(this, 'ProdAlias', {
      aliasName: 'prod',
      version: lambdaFunction.currentVersion,
    });

    const stageAlias = new lambda.Alias(this, 'StageAlias', {
      aliasName: 'stage',
      version: lambdaFunction.currentVersion,
    });

    // Crear una API Gateway para exponer la función Lambda
    const api = new apigateway.RestApi(this, 'LambdaApi', {
      restApiName: `${props.projectName}-api`,
      description: `API para ${props.projectName}`,
      deployOptions: {
        stageName: 'api',
      },
      // Habilitar CORS
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // Configurar la integración de Lambda
    const lambdaIntegration = new apigateway.LambdaIntegration(prodAlias);

    // Método ANY en la raíz (/)
    api.root.addMethod('ANY', lambdaIntegration);

    // Agregar el recurso proxy {proxy+} directamente en la raíz
    const proxyResource = api.root.addResource('{proxy+}');

    // Método ANY en el recurso proxy
    proxyResource.addMethod('ANY', lambdaIntegration);

    // Outputs
    new cdk.CfnOutput(this, 'LambdaFunctionArn', {
      value: lambdaFunction.functionArn,
      description: 'ARN de la función Lambda',
    });

    new cdk.CfnOutput(this, 'LambdaFunctionName', {
      value: lambdaFunction.functionName,
      description: 'Nombre de la función Lambda',
    });

    new cdk.CfnOutput(this, 'ApiGatewayUrl', {
      value: api.url,
      description: 'URL de la API Gateway',
    });
  }
}