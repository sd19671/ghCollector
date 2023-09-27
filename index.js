import GitHubCollector from './collector.js'
import dotenv from 'dotenv';

dotenv.config({path: '.env.local'});

const collector = new GitHubCollector(process.env.BASE_URL, process.env.TOKEN, process.env.ORG_NAME); 

collector.iterateRepositories();

