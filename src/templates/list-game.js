/** @jsx jsx */
import { jsx, Header, Main, Container } from 'theme-ui'

import { Flex, Box, Card, Image, Heading, Text } from 'rebass'
import React from 'react'
import { Link, graphql } from 'gatsby'

import Item from '../components/item'
import Layout from '../components/layout'

export default class GameList extends React.Component {
  render() {
    // const posts = this.props.data.allMarkdownRemark.edges
    const { data } = this.props
    const posts = data.allCockpitProductos.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage =
      currentPage - 1 === 1
        ? '/juegos'
        : '/juegos/' + (currentPage - 1).toString()
    const nextPage = '/juegos/' + (currentPage + 1).toString()

    return (
      <Layout>
        <Box
          sx={{
            display: 'grid',
            gridGap: 3,
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gridAutoRows: 'max-content',
            gridAutoColumns: 'max-content',
            gridGap: '1rem',
            justifyContent: 'center',
          }}>
          {posts.map(({ node, index }) => {
            const title = node.titulo.value
            return (
              <div key={index}>
                <Item
                  description="queeeeeeeeeeeeeeeeeeee"
                  title={title}
                  slug={node.fields.slug}
                  image={node.portada.value.childImageSharp.fluid}
                />
              </div>
            )
          })}
        </Box>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            listStyle: 'none',
            padding: 0,
          }}>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0,
              }}>
              <Link
                to={`juegos/${i === 0 ? '' : i + 1}`}
                style={{
                  textDecoration: 'none',
                  color: i + 1 === currentPage ? '#ffffff' : '',
                  background: i + 1 === currentPage ? '#007acc' : '',
                }}>
                {i + 1}
              </Link>
            </li>
          ))}
          {!isLast && (
            <Link to={nextPage} rel="next">
              Next Page →
            </Link>
          )}
        </ul>
      </Layout>
    )
  }
}

export const gameListQuery = graphql`
  query gameListQuery($skip: Int!, $limit: Int!) {
    allCockpitProductos(
      filter: { lang: { eq: "any" } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          titulo {
            value
          }
          portada {
            value {
              childImageSharp {
                fluid(maxWidth: 200, quality: 50, toFormat: PNG) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
