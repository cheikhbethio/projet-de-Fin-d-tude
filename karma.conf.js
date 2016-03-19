module.exports = function(config){
	config.set({

		basePath : './',

		files : [

			'client/app/bower_components/jquery/dist/jquery.min.js',
			'client/app/bower_components/angular/angular.js',
			'client/app/bower_components/angular-resource/angular-resource.js',
			'client/app/bower_components/angular-contenteditable/angular-contenteditable.js',
			'client/app/bower_components/bootstrap/dist/js/bootstrap.min.js',
			'client/app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
			'client/app/bower_components/ngstorage/ngStorage.js',
			'client/app/bower_components/angular-bootstrap-show-errors/src/showErrors.js',
			'client/app/bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
			'client/app/bower_components/textAngular/dist/textAngular-rangy.min.js',
			'client/bower_components/textAngular/dist/textAngular-sanitize.min.js',
			'client/bower_components/textAngular/dist/textAngular.min.js',
			'client/bower_components/snapjs/snap.js',
			'client/app/bower_components/angular-snap/angular-snap.js',
			'client/app/bower_components/ngToast/dist/ngToast.js',
			'client/app/bower_components/jquery-minicolors/jquery.minicolors.js',
			'client/app/bower_components/angular-minicolors/angular-minicolors.js',
			'client/app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'client/app/bower_components/angular-dialog-service/dist/dialogs.min.js',
			'client/app/bower_components/angular-dialog-service/dist/dialogs-default-translations.min.js',

			'client/app/bower_components/angular/angular.js',
			'node_modules/angular-ui-router/release/angular-ui-router.js',
			'node_modules/angular-bootstrap-show-errors/src/showErrors.js',
			'client/app/bower_components/angular-mocks/angular-mocks.js',

			'client/app/app.js',

			'client/app/components/registration/registration-directive.js',

			'client/app/components/**/*.js',
			'client/app/site/**/*.js',
			'client/app/dashboard/**/*.js'
			
		],

		autoWatch : true,

		frameworks: ['jasmine'],

		browsers : ['chromium-browser', 'Chrome'],

		plugins : [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-jasmine',
			'karma-junit-reporter'
		],

		junitReporter : {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}
	});
};