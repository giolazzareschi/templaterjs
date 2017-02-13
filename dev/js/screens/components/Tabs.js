var Tabs = Templater.extend({

	type: 'Tabs',

	tabsElements: [],

	constructor: function( config ) {

		this.tabs = config;

		this.base.call(this);
	},

	binds: function() {

		this.tabsElements = [];

		for(var i=0, qt=this.tabs.length; i<qt; i++){
			var 
				item = this.tabs[i],
				tabHeader = new TabHeader({
					TabManager: this,
					index: i,
					template_data: {
						title: item.title
					}
				}),
				tabBody = new TabBody(item.content);

			tabHeader.append(this.elements.tab_header);
			tabBody.append(this.elements.tab_body);

			this.tabsElements.push({
				TabHeader: tabHeader,
				TabBody: tabBody
			})
		}

		this.selectTab(0);	
	},

	selectTab: function( index ) {
		
		var
			item, hader, body;

		for(var i=0, qt=this.tabsElements.length; i<qt; i++){
			item = this.tabsElements[i]; 
			header = item.TabHeader; 
			body = item.TabBody; 
			
			header.unselect();
			body.unselect();
		}

		item = this.tabsElements[index];
		header = item.TabHeader;
		body = item.TabBody;

		header.select(index);
		body.select(index);
	},

	getTabItem: function(index) {
		return this.tabs[index].content;
	},

	template: ''+
		'<div class="tabs-wrapper">'+
			'<div id="tab_header" class="tab-header"></div>'+
			'<div class="tab-container"><div id="tab_body" class="tab-body"></div></div>'+
		'</div>'

});

var TabHeader = Templater.extend({

	type: 'TabHeader',

	constructor: function(config) {
		this.index = config.index;

		this.TabManager = config.TabManager;

		this.base.call(this, config);
	},

	unselect: function() {
		this.dom.classList.remove('selected');
	},

	select: function() {
		this.dom.classList.add('selected');
	},

	events: {
		'click': function() {
			this.TabManager.selectTab(this.index);
		}
	},

	template: '<div class="tab-header-item">{{title}}</div>'

});

var TabBody = Templater.extend({

	type: 'TabBody',

	constructor: function(content) {

		this.content = content;

		this.base.call(this);
	},

	binds: function() {
		this.content.render(this.dom);
	},

	unselect: function() {
		this.dom.classList.remove('selected');
	},

	select: function() {
		this.dom.classList.add('selected');
	},

	template: '<div class="tab-body-item"></div>'

});