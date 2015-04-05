var Post = {
	tableName : "T_POSTS",
	// identity: 'post',
	// Enforce model schema in the case of schemaless databases
	schema : true,
	meta : {
		schemaName : "sails-fb-auth"
	},
	autoPK : true,

	attributes : {
		pid : {
			type : 'string',
			unique : true,
			required : true
		},
		message : {
			type : 'string',
			unique : false
		},
		user : {
			model : 'User',
		},
	},
	beforeValidate : function(values, cb) {
		console.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> beforeCreate(1) - values.pid = "
				+ values.pid);
		if(!(values.pid && values.pid !== null)) {
			values.pid = "" + new Date().getTime();
			console.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> beforeCreate(2) - values.pid = "
					+ values.pid);
		}
		cb();
	}
};

module.exports = Post;
