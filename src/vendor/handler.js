const {
  SendMessageCommand,
  DeleteMessageCommand,
  ReceiveMessageCommand,
} = require('@aws-sdk/client-sqs');

const { sqsClient, chance, QUEUES } = require('../util');

async function sendPickup(vendorId) {
  const event = {
    vendor: vendorId,
    store: chance.city(),
    orderId: chance.guid().substring(0, 8),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log('Vendor asking for pickup!', event.vendor, event);

  try {
    const message = await sqsClient.send(
      new SendMessageCommand({
        MessageBody: JSON.stringify(event),
        MessageGroupId: vendorId,
        QueueUrl: QUEUES.Pickup,
      })
    );
    console.log('Vendor send pickup request!', message.MessageId);
    return message;
  } catch (e) {
    console.error('Failed to send Pickup message', e);
  }
}

async function delivered() {
  try {
    const received = await sqsClient.send(
      new ReceiveMessageCommand({
        QueueUrl: QUEUES.Delivered,
      })
    );
    if (received.Messages?.length > 0) {
      await sqsClient.send(
        new DeleteMessageCommand({
          QueueUrl: QUEUES.Delivered,
          ReceiptHandle: received.Messages[0].ReceiptHandle,
        })
      );
      const payload = JSON.parse(received.Messages[0].Body);
      console.log('Driver delivered package', payload);
    }
  } catch (e) {
    console.error('Failed to notify delivery', e);
  }
}

function startVendor(name) {
  console.log('vendor ready!');

  function ready() {
    sendPickup(name);
    delivered();
    setTimeout(ready, chance.integer({ min: 3000, max: 4000 }));
  }
  ready();
}

module.exports = {
  startVendor,
};
