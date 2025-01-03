/*
Configures web3 with a provider from metamask 
*/

import Web3 from "web3";
require("dotenv").config();

let web3;
const infuraLink = process.env.infura_Link;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(infuraLink);
  web3 = new Web3(provider);
}

export default web3;
