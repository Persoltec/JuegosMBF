module.exports = {
	plugins: [
		'gatsby-plugin-theme-ui',
		//'gatsby-plugin-mdx',
		`gatsby-transformer-remark`,

		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages',
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: '@fika/gatsby-source-cockpit',
			options: {
				//token: '533c9c2741555ee19d2f9c364ece1f',
				//baseUrl: 'http://localhost/juegosmbf',
				token: '0070118e4afbb10dbe62a0cda039b1',
				baseUrl: 'https://admin.secreativo.ml',

				locales: ['any', 'en'],
			},
		},
	],
}
