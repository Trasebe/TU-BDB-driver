/**
 * @file ErrorMessages.js
 * @author:
 *   Maurice Dalderup <Maurice_Dalderup@hotmail.com>
 * @date 2018
 */

export const MissingConnection = 'No connection to BigchainDB has been established! Please provide the parameters in the constructor or import and call Connection(bdbUri, bdbId, bdbKey)';
export const NoConnectionPassed = 'No connection is passed in the constructor, please provide the parameters in the constructor or import and call Connection(bdbUri, bdbId, bdbKey). ' +
  'You won\'t be able to perform any actions without a connection.';

export const AssetNotOwnedByCaller = 'The request asset to transfer/burn is not in your ownership.';
