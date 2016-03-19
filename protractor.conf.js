exports.config = {

	baseUrl: 'http://localhost:3333/',
	specs: ['e2e-tests/*.js'],

	framework: 'jasmine',

  	jasmineNodeOpts: {
    	defaultTimeoutInterval: 30000
  	}
};
