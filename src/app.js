import express from 'express';

class App {
  constructor() {
    this.server = express();
  }

  middlewares() {}

  routes() {}
}

export default new App().server;
