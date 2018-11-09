var words = [
	'jekyll',
	'windows',
	'linux',
	'react',
	'javascript',
	'virtualisation',
	'hosting',
	'frontend',
	'blog',
	'redux',
	'es6',
	'tooling',
	'server',
	'vue',
	'gulp',
	'webpack',
	'babel',
	'vscode',
	'ubuntu',
	'chrome',
	'google',
	'css',
	'gatsby',
	'html',
	'compression',
	'perl',
	'c sharp',
	'syntax',
	'metalsmith',
	'preact',
	'angular',
	'webstorm',
	'sublime',
	'github',
	'git',
	'wsl',
	'macos',
	'msi'
];

for(var i = 0; i < 30; i++) {
	var output = '[';
	var multiple = Math.floor(Math.random() * 6) + 1;
	
	for(var j = 1; j <= multiple; j++) {
		var position = Math.floor(Math.random() * 28);
		var tag = words[position];
		output = output + tag + ', ';
	}
	
	var tags = output.slice(0, -2);
	tags = tags + ']';
	console.log(tags);
}



