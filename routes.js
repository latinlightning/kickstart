/*
Required to use the next-routes module to define routes for the application.
Also needs server.js
*/

const routes = require("next-routes")();

routes
  //Defines route for the create new campaign component
  .add("/campaigns/new", "/campaigns/new")
  //Defines new route for a specific campaign, and shows the campaign/show component
  .add("/campaigns/:address", "/campaigns/show")
  //Shows requests for a specific campaign
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  //Route for creating new request for a campaign
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new");

module.exports = routes;
