
/**
 * module dependencies.
 */

var express = require('express'),
		events = require('events'),
		sys = require('sys'),
		fs = require('fs'),
//		gzippo = require('gzippo'),
		CustomBuild = require('./services/builder/custom_build').CustomBuild,
		Encode64 = require('./services/builder/encode64').Encode64,
		meta = require('./models/meta').meta;
		undefined;


var app = module.exports = express.createServer();

/**
 * constants.
 */
 
/**
 * app configuration.
 */
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
// gzip compression
//	app.use(gzippo.staticGzip(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});

/**
 * rutes

// build lastest version
app.get( '/lastest/:type/:min?', function( req, res ) {
 			
		var type = req.params.type;
		var min = req.params.min;
		
		var packages = [{
				"name": "chico",
				"input": "../chico/src/"+type+"/",
				"type": type,
				"min": (min) ? true : false,
				"virtual": true // Don't write the files
		}];
		
		var custom = new CustomBuild( packages );
				custom.avoidCompress();
				custom.on( "processed" , function( data ) {
						res.header('Content-Type', (type3==="js") ? "text/javascript" : "text/css" );
						res.send( data );
				});
		
});
*/

/**
 * Download
 */
// get 
app.get( '/download', function( req, res ) {
		
	res.render( 'download', meta );
	
});

// post 
app.post('/download', function( req, res ){

//		console.log( req.body );

		var components = ( typeof req.body.class === "object" ) ? // If collection 
												req.body.class.join(",") : 
												req.body.class,
				abstracts = ( typeof req.body.abstract === "object" ) ? // If collection 
												req.body.abstract.join(",") : 
												req.body.abstract,
				utils = ( typeof req.body.util === "object" ) ? // If collection 
												req.body.util.join(",") : 
												req.body.util,
				flavor = req.body.flavor,
				use_mesh = req.body.mesh,
				embed = req.body.embed;
				env = req.body.env;

		if ( !abstracts || !utils || !components ) {
				res.send(); // Avoid process without components
				return;
		}

		// JavaScripts Pack
		var js = function() {
				return {
						"name": "chico",
						"input": "../chico/src/js/",
						"components": abstracts.toLowerCase() + "," + utils.toLowerCase() + "," + components.toLowerCase(),
						"type": "js"
				}
		};

		// Stylesheets Pack
		var css = function() {
				return {
						"name": "chico",
						"input": "../chico/src/" + flavor + "/css/",
						"components": components + ( ( use_mesh ) ? ",mesh" : "" ),
						"embed": ( embed ) ? true : false,
						"type": "css"
				}
		};
		
		// Mesh Pack
		var mesh = function() {
				return {
						"name": "mesh",
						"input": "../chico/src/css/",
						"components": "mesh",
						"embed": ( embed ) ? true : false,
						"type": "css"
				}
		};

		// Pack the thing
		var packages = [];
		// for Production
		if ( env.toString().indexOf("p") > -1 ) {
				// JS
				var p_js = js();
						p_js.min = true;
						packages.push(p_js);
				// CSS
				var p_css = css();
						p_css.min = true;
						packages.push(p_css);
		}
		
		// for Dev
		if ( env.toString().indexOf("d") > -1 ) {
				// JS
				var d_js = js();
						packages.push( d_js );
				// CSS
				var d_css = css();
						packages.push( d_css );
		}

		console.log(packages);
		
		var custom = new CustomBuild( packages );
				custom.on("done", function( uri ) {
						//res.send( uri );
						res.redirect( uri );
				});

});

/**
 * Snippets.
 */
// get
app.get('/snippets', function(req, res){
	res.render('snippets', meta );
});

/**
 * Discussion.
 */
// get
app.get('/discussion', function(req, res){
	meta.title = "Discussion on Chico UI";
	res.render('discussion', meta );
});

/**
 * Getting started.
 */
// get
app.get('/getting-started', function(req, res){
	// new title
	meta.title = "Getting started with Chico UI";
	res.render('getting-started', meta );
});

/**
 * Docs.
 */
// get
/*app.get('/docs', function(req, res){
	// new title
	meta.title = "Getting started with Chico UI";
	res.render('docs', meta );
});
*/

app.get('/docs',function(req, res){
		res.render('docs', meta);
});

app.get('/docs/:branch/:label?',function(req, res){
		var branch = req.params.branch,
			label = req.params.label;
			
			if(branch!=undefined && label!=undefined){
				var redefBranch = (branch=='how-to')?'howtos':branch;
				var url = '/docs/'+branch+'/'+label;
				items = meta[redefBranch];
				for(var i in items){
					if(items[i].href == url){
						res.render('docs/'+branch+'/'+label, meta );
						return;
					}
				}
				res.render('404', meta );
				return;
				//res.render('docs/'+brancDzh+'/'+label, meta );
			} else if(label==undefined){
				var url = '/docs/'+branch;
				items = meta.docs;
				for(var i in items){
					if(items[i].href == url){
						res.render('docs/'+branch, meta );
						return;
					}
				}
				//res.send("Error 404 | Branch: "+branch+", Label: "+label);
				res.render('404', meta );
				return;
			}
			//res.send("Error 404 | Branch: "+branch+", Label: "+label);
			res.render('404', meta );
			return;
});

/*
// get
app.get('/how-to/:label?', function(req, res){

	// get label
	var label = req.params.label;

	// no label, go to getting started	
	if (label == undefined) {
		res.render('getting-started', meta );
	return;
	}

	// re define title
	var title = label.split("-").join(" ");
		
	// new title
	var _meta = Object.create(meta);
		_meta.title = title;
	
	// render
	res.render('how-to/'+label, _meta );
	
});
*/
/**
 * Demos
 */
/*
// get
app.get('/demos/:label?', function(req, res){

	// get label
	var label = req.params.label;

	// no label, go to getting started	
	if (label == undefined) {
		res.render('getting-started', meta );
	return;
	}

	// re define title
	var title = label.split("-").join(" ");

	// new title
	var _meta = Object.create(meta);
		_meta.title = title + " demo.";

	// render
	res.render('demos/'+label, _meta );
	
});
*/
/**
 * Index.
 */
// get
app.get('/', function(req, res){
	res.render('index', meta );
});

/**
 * app start
 */ 
app.listen(8080);

/**
 * log
 */
console.log("Express server listening on port %d", app.address().port);