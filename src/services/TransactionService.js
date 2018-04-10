/**
 * @file TransactionService.js
 * @author:
 *   Maurice Dalderup <Maurice_Dalderup@hotmail.com>
 * @date 2018
 */

import * as driver from "bigchaindb-driver";
import { sha3_256 } from "js-sha3"; // eslint-disable-line
import { getConnection } from "./../services/ConnectionService";

const { Transaction } = driver;


/*
=============================
LOCAL ACCESSIBLE FUNCTIONS
=============================
 */
const prepareCreate = (asset, metaData, keypair, hidden) => {
  // Prepare a transaction object for a CREATE transaction (param hidden = optional)
};

const prepareTransfer = (tx, reason, from, to) => {
  // Prepare a transaction object for a TRANSFER transaction (param hidden = optional)
};

/*
==================
EXPOSED FUNCTIONS
==================
 */
export const getTransactionOwner = (tx) => {
  // Get a certain transaction and extract the owner form the response (needed for validation if a transfer is allowed)
  // This function is optional. Remove the owner check in 'BdbService.js' if you would like to omit validation
};

export const createTransaction = (asset, metaData, from, hidden) => new Promise(async (resolve, reject) => {
  // Send the prepared create transaction to the blockchain
});

export const transferTransaction = (tx, reason, from, to) => new Promise(async (resolve, reject) => {
  // Send the prepared transfer transaction to the blockchain
});