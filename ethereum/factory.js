import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
require("dotenv").config();

factory_address = process.env.campaign_factory_address;
//Show CampaignFactory contract
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  factory_address
);

export default instance;
