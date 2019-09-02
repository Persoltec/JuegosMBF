import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Item from '../components/item'
import { jsx, Header, Main, Container } from 'theme-ui'

import { Flex, Box, Card, Image, Heading, Text } from 'rebass'
class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allCockpitProductos

    return (
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
        {posts &&
          posts.map(({ node: post }) => (
            <Item
              key={post.id}
              description="queeeeeeeeeeeeeeeeeeee"
              title={post.titulo.value}
              slug={post.fields.slug}
              image={post.portada.value.childImageSharp.fluid}
            />
          ))}
      </Box>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allCockpitProductos(filter: { lang: { eq: "any" } }) {
          edges {
            node {
              id
              fields {
                slug
              }
              titulo {
                type
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
              descripcion {
                type
                value {
                  childMarkdownRemark {
                    html
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
