/**
 * @file bdbService.js
 * @author:
 *   Maurice Dalderup <Maurice_Dalderup@hotmail.com>
 * @date 2018
 */

import bip39 from "bip39";

import * as driver from "bigchaindb-driver";
import * as ErrorMessages from "../utils/ErrorMessages";

import Connection from "./ConnectionService";
import * as TransactionService from "./TransactionService";

const { Ed25519Keypair } = driver;
const BURN_ADDRESS = {
  publicKey: "BurnBurnBurnBurnBurnBurnBurnBurnBurnBurnBurn"
};

export default class BdbService {
  /**
   * Generates a keypair
   * @param {string} seed
   * @returns {_Ed25519Keypair3.default}
   */
  createKeypair = seed =>
    new Ed25519Keypair(bip39.mnemonicToSeed(seed).slice(0, 32));

  /**
   * Constructor - initializing the service with or without a BigchainDB Connection
   * @param bdbUri
   * @param bdbId
   * @param bdbKey
   */
  constructor(bdbUri = null, bdbId = null, bdbKey = null) {
    this.connection = null;

    // bdbId && bdbKey may be null
    if (bdbUri) {
      this.connection = Connection(bdbUri, bdbId, bdbKey);
    } else {
      // Warn the user that no connection is established and actions cannot be executed without it
      console.warn(ErrorMessages.NoConnectionPassed); // eslint-disable-line
    }
  }

  /**
   * Generate a random identity (public and private key) based on a seed (Passphrase)
   * @param {string} seed
   * @returns {*}
   */
  generateKeypair = seed => this.createKeypair(seed);

  /**
   * Accepts a function and args. Only executes the function with the given args when a connection is present
   * @param {function} func
   * @param args
   * @returns {*}
   */
  executor = (func, ...args) => {
    if (!this.connection) {
      throw new Error(ErrorMessages.MissingConnection);
    }

    return func(...args);
  };

  /**
   * Executing a create transaction
   * @param {Object} asset
   * @param {Object} metaData
   * @param {Ed25519Keypair} fromKeypair
   * @param {boolean} hidden
   * @returns {Promise<void>}
   */
  createTransaction = async (asset, metaData, fromKeypair, hidden = false) =>
    this.executor(
      TransactionService.createTransaction,
      asset,
      metaData,
      fromKeypair,
      hidden
    );

  /**
   * Executing a transfer transaction
   * @param {Object} tx
   * @param {string} reason
   * @param {Ed25519Keypair} from
   * @param {Ed25519Keypair} to
   * @returns {Promise<void>}
   */
  transferTransaction = async (tx, reason, from, to) => {
    if (tx.outputs[0].public_keys[0] === from.publicKey) {
      return this.executor(TransactionService.transferTransaction,
        tx,
        reason,
        from,
        to
      );
    }
    throw new Error(ErrorMessages.AssetNotOwnedByCaller);
  };

  /**
   * Executing a burn/transfer transaction
   * @param {Object} tx
   * @param {string} reason
   * @param {Ed25519Keypair} from
   * @returns {Promise<void>}
   */
  burnTransaction = async (tx, reason, from) => {
    if (tx.outputs[0].public_keys[0] === from.publicKey) {
      return this.executor(TransactionService.transferTransaction,
        tx,
        reason,
        from,
        BURN_ADDRESS
      );
    }
    throw new Error(ErrorMessages.AssetNotOwnedByCaller);
  };
}
