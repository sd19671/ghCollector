import GitHubCollector from './collector.js/'

// https://github.com/microsoft
const collector = new GitHubCollector('https://api.github.com', '<your pat>', 'microsoft'); 

collector.iterateRepositories();

