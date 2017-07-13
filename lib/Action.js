class Action {

  constructor(method, path, middleware, action) {

    if (typeof path === "string") {
      // new Action('GET', ':/job_id', ACTION)
      if (!action) {
        // new Action('GET', ':/job_id', MIDDLEWARE, ACTION)
        action = middleware;
        middleware = undefined;
      }
    } else if (!middleware) {
      // new Action('GET', ACTION)
      action = path;
      path = undefined;
      middleware = undefined;
    } else {
      // new Action('GET', MIDDLEWARE, ACTION)
      action = middleware;
      middleware = path;
      path = undefined;
    }

    if (!method) throw new Error("Method required.");
    if (!action) throw new Error("Action required.");

    this.method = method; // 'GET'
    this.path = path || ''; // '/:user_id'
    this.middleware = middleware; // Function
    this.action = action; // Function
  }

}
