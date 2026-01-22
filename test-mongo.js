const dns = require('dns');
dns.setServers(['8.8.8.8']);

const { MongoClient } = require('mongodb');

// Direct connection to ONE server only
const uri ="mongodb://DiptaTest:Dipta1234@ac-0o4eq5p-shard-00-02.exuyu84.mongodb.net:27017/smart-ecommerce?tls=true&authSource=admin&directConnection=true";

const client = new MongoClient(uri);

async function run() {
  try {
    console.log('Connecting directly...');
    await client.connect();
    console.log('Connected!');
    await client.db("admin").command({ ping: 1 });
    console.log("Ping successful!");
  } catch (e) {
    console.error('Full error:', e.message);
    if (e.cause) console.error('Cause:', e.cause);
  } finally {
    await client.close();
  }
}

run();
