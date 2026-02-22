import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({
  region: process.env.AWS_REGION,
});

export const sendTaskNotification = async (message: string) => {
  try {
    const PublishNotificationCommand = new PublishCommand({
      TopicArn: process.env.SNS_TOPIC_ARN,
      Subject: "New Task Created",
      Message: message,
    });

    await snsClient.send(PublishNotificationCommand);
  } catch (error: any) {
    console.log(error)
    throw new Error ("Error sending SNS notification");
  }
};