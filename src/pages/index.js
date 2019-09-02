import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import List from '../components/List'

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <List />
    <Link to="/otro/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
