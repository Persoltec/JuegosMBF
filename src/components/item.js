import React from 'react'
import { Box, Card, Image, Heading, Text } from 'rebass'
import { motion } from 'framer-motion'
import Img from 'gatsby-image/withIEPolyfill'
import { Link } from 'gatsby'

export default ({ image, title, slug, description }) => (
  <motion.div
    whileHover={{ scale: 0.95 }}
    whileTap={{ scale: 0.95 }}
    width={'100%'}>
    <Card
      sx={{
        p: 0,
        borderRadius: 4,
        boxShadow: '0 0 16px rgba(0, 0, 0, .25)',
        overflow: 'hidden',
      }}>
      <Box
        sx={{
          paddingTop: '60%',
          display: 'block',
          position: 'relative',
        }}>
        <Img
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          objectFit="cover"
          objectPosition="50% 50%"
          alt=""
          fluid={image}
        />
      </Box>
      <Box p={2}>
        <Heading as="h3">
          <Link to={'juegos/' + slug}>{title}</Link>
        </Heading>
        <Text fontSize={0}>{description}</Text>
      </Box>
    </Card>
  </motion.div>
)
