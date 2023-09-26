import GitHubCollector from './collector.js/'

// https://github.com/microsoft
const collector = new GitHubCollector('https://api.github.com', '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', 'microsoft'); 

collector.iterateRepositories();

