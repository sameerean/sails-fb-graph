var User = {
	tableName : "T_USERS",
	// Enforce model schema in the case of schemaless databases
	schema : true,
//	identity: 'user',
	meta : {
		schemaName : "sails-fb-auth"
	},
	autoPK: true,

	attributes : {
		/*id: {
            type: 'string',
            primaryKey: true
        },*/
		pid : {
			type : 'string',
			unique : true,
			required : true
		},
		/*userName : {
			type : 'string',
			unique : true
		},*/
		email : {
			type : 'string',
			unique : true
		},
		firstName : {
			type : 'string',
			unique : false
		},
		lastName : {
			type : 'string',
			unique : false
		},
		imageUrl : {
			type : 'string',
			unique : false
		},
	}
};

module.exports = User;
