const amqpCh = require('./connect');

const q = 'tasks';

// subscribe
async function subscribeMessage(exchangeName, routingKey, callback) {
  //const amqpchannel = await amqpCh.connectRabbit(ch => ch);
  amqpCh.connectRabbit((ch) => {
    ch.assertQueue(q).then((ok) => {
      ch.consume(q, (msg) => {
        if (msg !== null) {
          console.log(msg.content.toString());
          callback(ch.ack(msg));
        }
      });
    }).catch(console.warn);
  });
}

exports.subscribeMessage = subscribeMessage;
