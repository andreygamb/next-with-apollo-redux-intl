import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import store from 'store'
import withRedux from 'next-redux-wrapper'
import styled from 'styled-components'
import { defineMessages, FormattedMessage } from 'react-intl'

import Root from 'components/Root'
import Submit from 'components/Submit'
import PostList from 'components/PostList'
import withApollo from 'utils/apollo/withApollo'
import withIntl from 'utils/intl'
import { Container } from 'utils/styles'

const messages = defineMessages({
  title: 'Next.js with apollo, redux, intl РУ'
})

@withApollo
@withIntl
@withRedux(store)
export default class extends Component {
  static getInitialProps({ store, isServer }) {
    return { isServer }
  }

  render() {
    return (
      <Root>
        <Container>
          <Content>
            <FormattedMessage {...messages.title} />
            <Submit />
            <PostList />
          </Content>
        </Container>
        <img src={require('/static/img/example.jpg')} />
      </Root>
    )
  }
}

const Content = styled.div`
  padding: 40px 0;
`
