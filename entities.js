export default class Repository {
  constructor(repoId, name, topics) {
    this.repoId = repoId;
    this.name = name;
    this.topics = topics;
  }
}

// class Rules {
//   constructor(name, description, appId) {
//     this.name = name;
//     this.description = description;
//     this.appId = appId;
//   }
// }

// class RulesTemplate {
//   constructor(name, description, rules) {
//     this.name = name;
//     this.description = description;
//     this.rules = rules;
//   }
// }

// class Result {
//   constructor(rule, status, reason = null ) {
//     this.rule = rule;
//     this.status = status;
//     this.reason = reason;
//   }
// }
