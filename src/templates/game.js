/** @jsx jsx */
import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import Layout from '../components/layout'

import { jsx, Header, Main, Container } from 'theme-ui'
import { Flex, Box, Card, Image, Heading, Text } from 'rebass'

class GameTemplate extends React.Component {
	render() {
		const post = this.props.data.cockpitProductos
		const imgnexpre = this.props.data.allImageSharp

		const { previous, next } = this.props.pageContext
		//alert(JSON.stringify(imgnexpre.edges.length, null, 4))
		//alert(JSON.stringify(imgpre.edges[0].node.fluid, null, 4))

		let imgNex, imgPre

		if (imgnexpre.edges.length === 1) {
			if (previous && next) {
				imgNex = imgPre = (
					<Img
						style={{
							width: '40px',
							height: '40px',
						}}
						objectFit="contain"
						objectPosition="50% 50%"
						alt=""
						fluid={imgnexpre.edges[0].node.fluid}
					/>
				)
			} else {
				if (next) {
					imgNex = (
						<Img
							style={{
								width: '40px',
								height: '40px',
							}}
							objectFit="contain"
							objectPosition="50% 50%"
							alt=""
							fluid={imgnexpre.edges[0].node.fluid}
						/>
					)
				} else {
					imgPre = (
						<Img
							style={{
								width: '40px',
								height: '40px',
							}}
							objectFit="contain"
							objectPosition="50% 50%"
							alt=""
							fluid={imgnexpre.edges[0].node.fluid}
						/>
					)
				}
			}
		} else {
			imgNex = (
				<Img
					style={{
						width: '40px',
						height: '40px',
					}}
					objectFit="contain"
					objectPosition="50% 50%"
					alt=""
					fluid={imgnexpre.edges[1].node.fluid}
				/>
			)
			imgPre = (
				<Img
					style={{
						width: '40px',
						height: '40px',
					}}
					objectFit="contain"
					objectPosition="50% 50%"
					alt=""
					fluid={imgnexpre.edges[0].node.fluid}
				/>
			)
		}

		return (
			<Layout>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<div
						sx={{
							alignSelf: 'center',
							padding: '10px',
							backgroundColor: '#fff',
							borderRadius: '3px',
							border: '1px solid #e6ecf1',
							boxShadow: '0 3px 8px 0 rgba(116,129,141,.1)',
						}}>
						{previous && (
							<Link
								sx={{
									color: 'text',
									textDecoration: 'none',
									display: 'inline-flex',
									alignItems: 'center',
									display: 'inline-flex',
									justifyContent: 'center',
								}}
								to={'juegos/' + previous.fields.slug}
								rel="prev">
								<div
									sx={{
										marginRight: '10px',
									}}>
									{previous.titulo.value}
								</div>
								{imgPre}
							</Link>
						)}
					</div>

					<div
						sx={{
							boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
						}}>
						<Link to={'juegos'} rel="index">
							Index
						</Link>
					</div>

					<div
						sx={{
							boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
						}}>
						{next && (
							<Link to={'juegos/' + next.fields.slug} rel="next">
								{next.titulo.value} {imgNex}
							</Link>
						)}
					</div>
				</Box>
				<h1>{post.titulo.value}</h1>
				<div
					dangerouslySetInnerHTML={{
						__html: post.descripcion.value.childMarkdownRemark.html,
					}}
				/>
				<Img
					objectFit="contain"
					objectPosition="50% 50%"
					alt=""
					fluid={post.portada.value.childImageSharp.fluid}
				/>
			</Layout>
		)
	}
}

export default GameTemplate

export const query = graphql`
	query($id: String!, $imgnexpre: String!) {
		cockpitProductos(id: { eq: $id }) {
			id
			titulo {
				value
			}
			descripcion {
				value {
					childMarkdownRemark {
						html
					}
				}
			}
			portada {
				value {
					childImageSharp {
						fluid(maxWidth: 600, quality: 50, toFormat: PNG) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}

		allImageSharp(filter: { fluid: { originalName: { regex: $imgnexpre } } }) {
			edges {
				node {
					fluid(maxWidth: 40, quality: 5, toFormat: PNG) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	}
`
