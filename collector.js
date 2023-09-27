import axios from "axios";
import Repository from './entities.js/';

export default class GitHubCollector {
  constructor(baseURL, token, organization) {
    this.token = token;
    this.organization = organization;
    this.baseURL = baseURL;
  }

  async checkRateLimit() {
    try {
      const response = await axios.get(`${this.baseURL}/rate_limit`, {
        headers: {
          Authorization: `token ${this.token}`,
        },
      });
      const rateLimit = response.data.rate;

      return rateLimit;
    } catch (error) {
      throw new Error(`Error checking rate limit: ${error.message}`);
    }
  }

  async getRepositories() {
    try {

      const perPage = 10; // Number of repositories to fetch per page
      let page = 1;
      let repositories = [];
      let totalCount = 0;
      
      const rateLimit = await this.checkRateLimit();
      let rateLimitRemaining = rateLimit.remaining;



      while (rateLimitRemaining >= 0) {

        if (rateLimit.remaining === 0) {
          const resetTime = new Date(rateLimit.reset * 1000);
          const now = new Date();
          const waitTime = resetTime - now;

          console.log(`Rate limit exceeded. Waiting for ${waitTime / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        const response = await axios.get(`${this.baseURL}/orgs/${this.organization}/repos`, {
          params: {
            page,
            per_page: perPage,
          },
          headers: {
            Authorization: `token ${this.token}`,
          },
        });

        const pageRepositories = response.data;

        rateLimitRemaining = response.headers['x-ratelimit-remaining'];
        console.log(`xHeader Rate limit: ${rateLimitRemaining} remaining.`);

        repositories = repositories.concat(pageRepositories);
        console.log(`Retrieved ${pageRepositories.length} repositories.`);
        if (pageRepositories.length < perPage) {
          // No more repositories to fetch
          console.log(`No more repos to fetch.`);
          break;
        }

        page++;
        if (page > 5) {
          // Only fetch first 5 pages
          console.log(`Only fetching first 10 pages.`);
          break;
        }

      }

      totalCount = repositories.length;

      return { totalCount, repositories };
    } catch (error) {
      throw new Error(`Error fetching repositories: ${error.message}`);
    }
  }

  async iterateRepositories() {
    try {
      const { totalCount, repositories } = await this.getRepositories();
      console.log(`Total repositories in the organization: ${totalCount}`);
      for (const repo of repositories) {
        console.log(`Repository Name: ${repo.name}`);
        // Add your custom logic here for each repository
        const repository = new Repository(repo.id, repo.name, repo.topics);
       
        console.log(JSON.stringify(repository, null, 2));

      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
