if (document.addEventListener) 
	document.addEventListener("DOMContentLoaded", start_app, false);

window.$list;
window.template_data;
function start_app(){

	// var tt = { data : [["giordano"],[{id : '001'}],"teste"] };
	template_data = { 
		name : "Giordano",
		phones : ["(47) 9128-2329", "(47) 9911-4370"],
		drones : [["giordano"],[{id : '001'}],"teste"]
	};

	// var ttt = cloneObject( template_data );

	// var end = deep( ttt, "", "" );

	$list = new List({
		template_data : template_data
	});

	$list.render( document.querySelector('#entry_point') );
};

var ends = {};

function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
 
    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }
 
    return temp;
}

function deep( root, root_type, root_label ){

	for( pp in root ){
		var el = root[ pp ], type = isarray( el ) || isobject( el ), end = root_label + root_type + pp;
		
		if( type ){
			end += deep( el, type, end );
		}else{
			ends[ end ] = el;
			root[ pp ] = end;
		}
	}

	return ends;
};

function deep_( root, root_type, root_label ){
	
	for( pp in root ){
		var el = root[ pp ], type = isarray( el ) || isobject( el ), end = root_label + root_type + pp;

		if( type ){
			end += deep_( el, type, end );	
		}else{
			ends[ end ] = el;
		}
	}

	return end;
};

function isarray( el ){
	return el.constructor.prototype === [].constructor.prototype ? "_" : null;
};

function isobject( el ){
	return el.constructor.prototype === {}.constructor.prototype ? "." : null;
};