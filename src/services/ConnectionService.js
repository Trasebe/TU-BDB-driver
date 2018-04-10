/**
 * @file ConnectionService.js
 * @author:
 *   Maurice Dalderup <Maurice_Dalderup@hotmail.com>
 * @date 2018
 */


import * as driver from 'bigchaindb-driver';

const { Connection } = driver;
let currentConnection = null;

export default function BDBConnection(bdbUri, bdbId, bdbKey, testnet = false) {
  if (testnet) {
    currentConnection = new Connection(bdbUri, {
      app_id: bdbId,
      app_key: bdbKey
    });
  } else {
    currentConnection = new Connection(bdbUri);
  }

  return currentConnection;
}

export function getConnection() {
  return currentConnection;
}