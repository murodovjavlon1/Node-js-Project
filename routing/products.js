import {Router} from 'express'
const router = Router()

router.get('/', (req, res) => {
	res.render('index', {
        title: "Boom Shop | J"

    })
})

router.get('/products', (req, res) => {
	res.render('products',{
        title: "Products | J"
    })
})

router.get('/add', (req, res) => {
	res.render('add', {
        title: "Add | J"
    })
})

export default router