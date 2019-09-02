/** @jsx jsx */
import { jsx, Header, Main, Container } from 'theme-ui'
import { Flex, Box, Card, Image, Heading, Text } from 'rebass'
import React from 'react'
import { Link } from 'gatsby'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
        <Box
          sx={{
            p: 3,
          }}>
          <h1>
            <Link to={`/`}>Logo</Link>
          </h1>
        </Box>
        <Box
          sx={{
            flex: '1 1 auto',
            p: 3,
          }}>
          <Box
            sx={{
              maxWidth: '90%',
              mx: 'auto',
              px: 3,
              py: 4,
            }}>
            {children}
          </Box>
        </Box>

        <Box
          sx={{
            p: 3,
          }}>
          Footer
        </Box>
      </Box>
    )
  }
}

export default Layout
