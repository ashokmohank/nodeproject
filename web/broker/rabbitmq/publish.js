const amqpCh = require('./connect');

var q = 'tasks';
// Publisher
async function publishMessage(exchangeName, message, routingKey) {
  console.log('publish called');
  // const amqpchannel = await amqpCh.connectRabbit(ch => ch);
  amqpCh.connectRabbit((ch) => {
    ch.assertQueue(q).then((ok) => {
      ch.sendToQueue(q, new Buffer(message));
    }).catch(console.warn);
  });
}

exports.publishMessage = publishMessage;
