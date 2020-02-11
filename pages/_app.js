import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import io from 'socket.io-client';
import { getStore } from '../modules/redux-config'
import withRoot from '../utils/withRoot'

class MyApp extends App {
  constructor (props) {
    super(props);
    this.state = {
      socket: null,
    };
  }

  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}
    const pathname = ctx.pathname

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, pathname }
  }

  componentDidMount() {
    const socket = io();
    this.setState({ socket });
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  render () {
    const { Component, pageProps, pathname } = this.props
    return (
      <Provider store={ getStore() }>
        <Component {...pageProps} pathname={pathname} socket={this.state.socket} />
      </Provider>
    )
  }
}

export default withRoot(MyApp)