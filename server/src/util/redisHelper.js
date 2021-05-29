const { flatObjectToArray } = require("./helper");

const { promisify } = require("util");


/**
 * @param client redis client connection object
 * @param key user connection ID
 * @param dataObject Data Object to be added
 * @return result printed to console
 */
exports.updateData = (client, key, dataObject) => {

  client.hmset(key, flatObjectToArray(dataObject), (err, res) => {
    console.log(`[${key}] [REDIS] Data updated`);
  });
  client.expire(key, CONSTANTS.REDIS_TTL_CONNECTION_KEY, () => {
    console.log(`[${key}] [REDIS] TTL Set`);
  });
};

/**
 * @param client redis client connection object
 * @param key Key for the connection
 * @returns data if available else empty object
 */
exports.getData = async (client, key) => {
  const hgetall = promisify(client.hgetall).bind(client);
  let ll = await hgetall(key).catch((err) => {
    console.error(`[${key}] [REDIS] ${err.message}`);    
  });

  return ll;
};

/**
 * @param client redis client connection object
 * @param key Key for the connection
 * @returns 1 if key del successful
 */
exports.destroyKey = async (client, key) => {
  const del = promisify(client.del).bind(client);
  let delResp = await del(key).catch((err) => {
    console.error(`[${key}] [REDIS] ${err.message}`);
  });
  return delResp;
};

