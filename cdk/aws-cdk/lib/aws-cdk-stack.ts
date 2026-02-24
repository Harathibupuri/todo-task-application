import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subs from "aws-cdk-lib/aws-sns-subscriptions";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as iam from "aws-cdk-lib/aws-iam";

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const snsTaskTopic = new sns.Topic(this, "TaskNotificationTopic");

    snsTaskTopic.addSubscription(
      new subs.EmailSubscription("harathibupuri@gmail.com"),
    );

    const taskQueue = new sqs.Queue(this, "TaskQueue", {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    snsTaskTopic.addSubscription(new subs.SqsSubscription(taskQueue));

    const vpc = new ec2.Vpc(this, "TaskVPC", { maxAzs: 2 });
    const securityGroup = new ec2.SecurityGroup(this, 'TaskSG', {
      vpc,
      allowAllOutbound: true,
    });

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH'
    );

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(3006),
      'Allow App Port'
    );
    
    const ec2Role = new iam.Role(this, "EC2Role", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
    });

    ec2Role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSNSFullAccess"),
    );

    new ec2.Instance(this, "TaskEC2", {
      vpc,
      instanceType: new ec2.InstanceType("t3.micro"),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      role: ec2Role,
      securityGroup,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      associatePublicIpAddress: true,
      keyName: "todo-key",
    });
  }
}
