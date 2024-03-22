import { defaultResJson } from '@/util/res'

export const homePage = (req, res) => {
	console.log('req', req.body)
	// res.send('Welcome to the homepage!')
	res.json(defaultResJson({ data: { a: 1 } }))
}
