const Action = require('./Action');
const Group = require('./Group');


class RouteBuilder {

  constructor(basePath, router) {
    if (!router) {
      router = basePath;
      basePath = '';
    }
    this.router = router;
    this.basePath = basePath;

    this.group = RouteBuilder.group;
    this.action = RouteBuilder.action;

    this.Action = Action;
    this.Group = Group;
  }

  applyMiddleware(path='', middlewares, children=[]) {

    children.forEach(child => {
      var nextPath = path+child.path;

      if (child instanceof Group) {

        this.applyMiddleware(nextPath, [...middlewares, ...child.middlewares], child.children);

      } else if (child instanceof Action) {

        var actions = [...middlewares];
        if (child.middleware) actions.push(child.middleware);
        actions.push(child.action);

        switch (child.method) {
          case 'GET':
            this.router.get(nextPath, actions);
            break;
          case 'POST':
            this.router.post(nextPath, actions);
            break;
          case 'PATCH':
            this.router.patch(nextPath, actions);
            break;
          case 'PUT':
            this.router.put(nextPath, actions);
            break;
          case 'DELETE':
            this.router.delete(nextPath, actions);
            break;

          default:
            throw new Error(`Invalid method. ${child.method}`);
        }

      } else {

        throw new Error("Child invalid", child);
      }
    });
  }

  applyGroup(group) {
    this.applyMiddleware(this.basePath, [], [group]);
  }

  use(router) {
    this.applyGroup(router(this.group, this.action));
  }

  static action(method, path, middleware, action) {
    return new Action(method, path, middleware, action);
  }

  static group(path, middlewares, children) {
    return new Group(path, middlewares, children);
  }

}

module.exports = RouteBuilder;
