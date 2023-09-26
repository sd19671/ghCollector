export class Repository {
  constructor(name, description, owner, appId) {
    this.name = name;
    this.description = description;
    this.owner = owner;
    this.appId = appId;
  }
}

export class Rules {
  constructor(name, description, appId) {
    this.name = name;
    this.description = description;
    this.appId = appId;
  }
}

export class RulesTemplate {
  constructor(name, description, rules) {
    this.name = name;
    this.description = description;
    this.rules = rules;
  }
}