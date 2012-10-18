exports.definition = {
	
	config: {
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
	},		

	extendModel: function(Model) {		
		_.extend(Model.prototype, {
						
			// extended functions go here

		}); // end extend
		
		return Model;
	},
	
	
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			
			// extended functions go here			
			
		}); // end extend
		
		return Collection;
	}
		
}

