import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'

export class vpcStack extends Construct {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string) {
    super(scope, id)
    const vpc = new ec2.Vpc(this, 'Vpc', {
        maxAzs: 2,
        ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
        // サブネットの設定
        subnetConfiguration: [
          {
            cidrMask: 24,
            name: 'PublicSubnet',
            subnetType: ec2.SubnetType.PUBLIC,
          },
        //   {
        //     cidrMask: 24,
        //     name: 'PublicSubnet2',
        //     subnetType: ec2.SubnetType.PUBLIC,
        //   },
          {
            cidrMask: 24,
            name: 'PrivateSubnet',
            subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          },
        //   {
        //     cidrMask: 24,
        //     name: 'PrivateSubnet2',
        //     subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        //   },
        ],
        natGateways: 1,
      });

    this.vpc = vpc;
  }
}