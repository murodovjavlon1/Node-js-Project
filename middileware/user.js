import jwt from 'jsonwebtoken'
import User from '../model/user.js'

export default async function (req, res, next) {
	if (!req.cookies.token) {
		next()
		return
	}

	const token = req.cookies.token
	const decode = jwt.verify(token, process.env.JWT_SECRET)
	const user = await User.findById(decode.userId)
	req.userId = user._id
	next()
}
