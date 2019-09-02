module.exports = {
	plugins: [
		'gatsby-plugin-theme-ui',
		//'gatsby-plugin-mdx',
		`gatsby-transformer-remark`,
		{
			// keep as first gatsby-source-filesystem plugin for gatsby image support
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/static/img`,
				name: 'uploads',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/img`,
				name: 'images',
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: '@fika/gatsby-source-cockpit',
			options: {
				token: '533c9c2741555ee19d2f9c364ece1f',
				baseUrl: 'http://localhost/juegosmbf',
				locales: ['any', 'en'],
			},
		},
	],
}
