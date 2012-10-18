migration.up = function(db) {
    db.createTable({
		"columns": {
			"name":"string",
			"type":"string",
			"container":"string",
			"owner_name":"string",
			"difficulty":"int",
			"terrain":"int",
			"lat":"double",
			"long":"double",
			"short_description":"string",
			"long_description":"string",
			"hint":"string"
		},
		"adapter": {
			"type": "sql",
			"collection_name": "cache"
		}
    });
};

migration.down = function(db) {
	db.dropTable('cache');
};
