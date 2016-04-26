define({
	appId: "NwuVecofpIv1X6U4TFGrwJZp7HdpZ4ciQcIWpo9c",
	jsId: "qBpxX9BEaq8wfPyz6hvgmZbtRwHKcGGKfBfxVT9P",
	emailTxt: "email",
	passwordTxt: "password",
	deviceIDTxt: "deviceID",
	months: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
	events: "events",
	places: "locations",
	placesTxt: "places",
	people: "people",
	entities: "entities",
	favorites: "favorites",
	APPDATA: "APPDATA",
	TRASHED: "trashed",
	stared: "*",
	previewState: "isPreview",
	taggingState : "isTagging",
	gridState: "isGrid",
	shareState : "isSharing",
	trashState : "isTrash",
	ENTITY_NAME: "ENTITY_NAME",
	FACEBOOK: "FACEBOOK",
	TWITTER: "TWITTER",
	EMAIL: "EMAIL",
	SMS: "SMS",
	
	getAllTypes: function()
	{
		return [this.events, this.places, this.people, this.entities, this.favorites];
	}

});