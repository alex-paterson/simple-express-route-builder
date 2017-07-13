Example:

```javascript
const UsersRouter = function(group, action) {
  return group('/users', [
    action('POST', UsersController.create),

    group(Authentication.requireAuth, [
      action('GET', UsersController.search),

      group('/:user_id', [
        action('GET', UsersController.get),

        group(UsersController.setUser, [
          group(UsersController.requireCorrectUser, [

            action('GET', '/notes', NotesController.index),

          ])
        ])
      ])
    ])
  ]);
};

var router = express.Router();
const routeBuilder = new RouteBuilder(router);
routeBuilder.use(UsersRouter);
```
