const amqp = require('amqplib');

const rabbitmqURL = 'amqp://duqmevuy:GZwJTeU9OlL-BWieL16tFtHqnkBc9Wcr@wasp.rmq.cloudamqp.com/duqmevuy';

let rabbitmqChannel;

function bail(err) {
  rabbitmqChannel = null;
  console.error(err);
  process.exit(1);
}
// connect
function connectRabbit(callback) {
  console.log('connect called');
  if (rabbitmqChannel) {
    callback(rabbitmqChannel);
  } else {
    amqp.connect(rabbitmqURL).then((conn, errConnect) => {
      if (errConnect != null) bail(errConnect);
      return conn.createChannel();
    }).then((ch, errCh) => {
      if (errCh != null) bail(errCh);
      rabbitmqChannel = ch;
      return callback(ch);
    }).catch(console.warn);
  }
}

exports.connectRabbit = connectRabbit;
