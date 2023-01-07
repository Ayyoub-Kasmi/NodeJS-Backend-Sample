const User = require('../models/user');

module.exports.user_get = (req,res)=>{
	//the user must be logged in to access this page, so we can have his id from the jwt as a second solution
	const id = req.params.id;
	User.findById(id)
		.then(result => res.send(result))
		.catch(err=>res.send(err));
}

module.exports.user_delete = (req, res)=>{
	console.log('User deleted');
}
