

var World = TemplaterList.extend({
	type: "World",
	template: '<ul></ul>',
	reactions: {
		items: function() {
			
		}
	}
});
var WorldItem = Templater.extend({
	template_data:'sample',
	type: "WorldItem",
	template: '<li>{{this}}</li>'
});

var Hello = Templater.extend({
	type: "Hello",
	template_data:{
		hello: 'Hello'
	},
	binds: function() {
		this.World = new World({template_data: {items: this.template_data.child.world}});
		this.World.render(this.elements.world);
		this.render(document.body);
	},
	reactions: {
		"child.world": function(dom, from, to) {
			
		},
		"hello": function(dom, from, to) {
			
		}
	},
	template: '<hello><span>{{hello}}</span><button disabled="{{buttonState}}">Button</button><span id="world"></span></hello>'
});