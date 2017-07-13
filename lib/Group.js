class Group {

  // new Group(':/job_id', [CHILDREN])
  // new Group(':/job_id', [MIDDLEWARES], [CHILDREN])
  // new Group([MIDDLEWARES], [CHILDREN])

  constructor(path, middlewares, children) {

    if (typeof path === "string") {
      if (!children) {
        children = middlewares;
        middlewares = undefined;
      }
    } else {
      children = middlewares;
      middlewares = path;
      path = undefined;
    }

    if (middlewares instanceof Function) middlewares = [middlewares];

    this.path = path || ''; // '/:user_id'
    this.middlewares = middlewares || []; // [Function]
    this.children = children; // [Function | Group]
  }

}
