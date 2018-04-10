import React, { Component } from "react";
import injectSheet from "react-jss";

import { Button } from "antd";
import message from "antd/es/message/index";
import { Col, Row } from "antd/lib/grid/index";


import BdbService from "../../services/BdbService";
import PrettyCode from "../../components/Bigchain/PrettyCode";
import * as wallets from "../../utils/Wallets";

const styles = {};

class Bigchain extends Component {
  constructor(props) {
    super(props);

    this.bdbService = new BdbService("http://localhost:9984/api/v1/");
    this.state = {
      tx: {},
      txTransfer: {},
      transferred: false,
      loading: false,
      alice: this.bdbService.generateKeypair(wallets.alice),
      bob: this.bdbService.generateKeypair(wallets.bob)
    };
  }

  createTransaction = async () => {
    this.setState({ loading: true });
    this.setState(
      {
        transferred: false,
        tx: await this.bdbService
          .createTransaction(
            { asset: Math.random().toString() },
            { meta: Math.random().toString() },
            this.state.bob
          )
          .catch(e => this.handleError(e))
      },
      () => this.setState({ loading: false })
    );
  };

  transferTransaction = async () => {
    if (
      this.state.transferred ||
      JSON.stringify(this.state.tx) === JSON.stringify({})
    ) {
      message.warning("Unable to transfer.");
      return;
    }
    this.setState({ loading: true });
    this.setState(
      {
        transferred: true,
        txTransfer: await this.bdbService
          .transferTransaction(
            this.state.tx,
            "Just for fun",
            this.state.bob,
            this.state.alice
          )
          .catch(e => this.handleError(e))
      },
      () => this.setState({ loading: false })
    );
  };

  handleError = e => {
    console.log("error ", e); // eslint-disable-line
  };

  render() {
    return (
      <React.Fragment>
        <Button
          type="primary"
          onClick={this.createTransaction}
          loading={this.state.loading}
        >
          Create
        </Button>
        <br/>
        <br/>
        <Button
          type="primary"
          onClick={this.transferTransaction}
          loading={this.state.loading}
        >
          Transfer
        </Button>

        <Row>
          <Col span={12}>
            <PrettyCode tx={this.state.tx}/>
          </Col>
          <Col span={12}>
            <PrettyCode tx={this.state.txTransfer}/>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default injectSheet(styles)(Bigchain);
