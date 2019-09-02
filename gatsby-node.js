const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // sort: { fields: [titulo___value], order: ASC }
  const result = await graphql(`
    query {
      allCockpitProductos(filter: { lang: { eq: "any" } }, limit: 1000) {
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
                name
              }
            }
          }
        }
      }
    }
  `)
  const juegos = result.data.allCockpitProductos.edges
  const postsPerPage = 4
  const numPages = Math.ceil(juegos.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/juegos` : `/juegos/${i + 1}`,
      component: path.resolve('./src/templates/list-game.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  juegos.forEach((juego, index) => {
    const next = index === juegos.length - 1 ? null : juegos[index + 1].node
    const previous = index === 0 ? null : juegos[index - 1].node

    const id = juego.node.id

    const imgpre = previous ? previous.portada.value.name : '/none/'
    const imgnex = next ? next.portada.value.name : '/none/'
    const imgnexpre = '/' + imgnex + '|' + imgpre + '/'

    console.log(JSON.stringify(next, null, 4))

    createPage({
      path: 'juegos/' + juego.node.fields.slug,
      component: path.resolve(`./src/templates/game.js`),
      context: {
        id,
        previous,
        next,
        imgnexpre,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `CockpitProductos`) {
    const value = slugify(node.titulo.value)
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

function slugify(string) {
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
