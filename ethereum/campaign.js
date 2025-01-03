import web3 from "./web3";
import Campaign from "./build/Campaign.json";

//This function takes the address of a deployed contract and returns an instance of the contract
export default (address) => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};
