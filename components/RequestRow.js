import React, { Component } from "react";
import { Table, Button, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class RequestRow extends Component {
  state = {
    loading: false,
    errorMessage: "",
  };

  onApprove = async () => {
    try {
      this.setState({ loading: true, errorMessage: "" });
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0],
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  onFinalize = async () => {
    this.setState({ loading: true, errorMessage: "" });
    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0],
      });
    } catch (err) {
      errorMessage: err.message;
    }
    this.setState({ loading: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;
    console.log(
      typeof web3.utils.fromWei(request.value, "ether"),
      typeof request.approvalCount,
      typeof approversCount
    );

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id.toString()}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether").toString()}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount.toString()} / {approversCount}
        </Cell>
        {request.complete ? null : (
          <Cell>
            <Button
              color="green"
              basic
              onClick={this.onApprove}
              loading={this.state.loading}
            >
              Approve
            </Button>
          </Cell>
        )}
        {request.complete ? null : (
          <Cell>
            <Button
              color="teal"
              basic
              onClick={this.onFinalize}
              loading={this.state.loading}
            >
              Finalize
            </Button>
          </Cell>
        )}
        {this.state.errorMessage && (
          <Message error header="Oops!" content={this.state.errorMessage} />
        )}
      </Row>
    );
  }
}

export default RequestRow;
