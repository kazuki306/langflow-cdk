import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CfnOutput } from 'aws-cdk-lib';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import * as targets from "aws-cdk-lib/aws-elasticloadbalancingv2-targets";
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Protocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { vpcStack } from './vpc';
import { WebServerInstance } from './web-server-instance';


export class LangflowCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const VPC = new vpcStack(this, "vpc");
    const vpc = VPC.vpc

    const webServer1 = new WebServerInstance(this, "langflowServer1", {
      vpc
    });
    // const webServer2 = new WebServerInstance(this, "langflowServer2", {
    //   vpc
    // });

    const alb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
      vpc,
      internetFacing: true
    });
    const listener = alb.addListener(
      'Listener', { 
        port: 7860,
        protocol: elbv2.ApplicationProtocol.HTTP 
      }
    )
    listener.addTargets('ApplicationFleet', {
      port: 7860,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [
        new targets.InstanceTarget(webServer1.instance, 7860),
        // new targets.InstanceTarget(webServer2.instance, 7860),
      ],
      healthCheck: {
        path: "/",
        port: '7860',
        protocol: Protocol.HTTP,
      },
    });

    alb.connections.allowFromAnyIpv4(ec2.Port.tcp(7860));

    // ALB からインスタンスへのアクセスを許可
    webServer1.instance.connections.allowFrom(alb, ec2.Port.tcp(7860));
    // webServer2.instance.connections.allowFrom(alb, ec2.Port.tcp(7860));
    
    new CfnOutput(this, "DNSAdress", {
      value: `http://${alb.loadBalancerDnsName}:7860`,
    });
  }
}
