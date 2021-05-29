const { redisConnection } = require("../connection/redis");

const {
  updateData,
  destroyKey,
  getData,
} = require("./redisHelper");

async function addClientId (client, key, dataObject){
  updateData(client, dataObject.room, {
    userId: dataObject.userID,
    connectionId: key,
  });
};

exports.updateSocketUserConnectionData = (id, obj, newFlag) => {
  updateData(redisConnection, id, obj);
  if (!newFlag) {
    // TODO: add if already a connection id exist
    addClientId(redisConnection, id, obj);
  }
};

exports.deleteSocketUserConnectionData = async (id) => {
  let obj = await getData(redisConnection, id);
  if (obj != null && obj != undefined) {
    destroyKey(redisConnection, obj.mac);
  }
  destroyKey(redisConnection, id);
};

// this will be identified by client connection id
exports.checkGroupOperation = async (client, key, dataObject) => {
  return await getData(client, key);
};
