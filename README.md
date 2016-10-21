# Spike Classes

```js
import ClientStateManager from 'espina/client/state_manager';
import ServerStateManager from 'espina/server/state_manager';
import ClientRouter from 'espina/client/router';
import ServerRouter from 'espina/server/state_manager';

import ApplicationComponent from 'espina/shared/application_component';
import BaseComponent from 'espina/shared/base_component'; 
import Route from 'espina/shared/route.js';

import RouteLink from 'espina/shared/components/route/route_link.component.js';
```

# Generators

## Component Generators

Should generate components within `shared/components` as such:

```sh
espina generate component Example --name --where utils -t -s -rt
```

This would generate:

```
shared/components/utils/example
  example.component.js
  example.scss
  example.test
  example.rt.html
```

Similarly:

```sh
espina generate route --name  Route1
```

This would generate:

```
shared/components/routes/route1
  route.component.js
  route.scss
  route.test.js
  route.rt.html
```

### Options
- `t` or `test` [false]: include example.test.js
- `rt` or `react-template` [false]: include example.rt.html
- `s` or `style` [false]: include example.scss

## Reducer Generators

```sh
spike generate reducer --name  User
```

This would generate:

```
shared/reducers/user
  user.reducers.js
  user.actions.js
  user.reducer.test.js
```

## Application Generator

```sh
espina generate app
```

This would generate the following structure.

```
client
  config
    design
      webpack.js
    develop
      webpack.js
    production
      webpack.js
    shared
      style.js
  app.js
server
  assets
    css
    js
    transalations
      en.json
  config
    design
      server.js
    develop
      server.js
    production
      server.js
    server.base.js
  views
    index.ejs
shared
  base_classes
  components
  mixins
  reducers
  routes.js
```

I will need to think through options to configure:

- Whether to include translations in app generation.

# Build and Run Tools

We will want to provide easy build commands:

```sh
NODE_ENV=production espina build
```

This should build client assets (app.js, style.css, as well as a server build in build/production/server). See this article.

```sh
NODE_ENV=development espina run
```

# Routes

We use `path_to_regex` in order to use express-style paths, so the routes must been an array with the fallowing syntax:

```js
import Router from 'spike/client/router';
Router route = new Router(i18m,[
  {
    name: "Info",
    path: "/info"
  },
  {
    name:"Details",
    path:`/${i18n.t('details')}/:id`,
    url:(payload,i18n) => {
      return `/${i18n.t('details')}/${payload.id}`
    }
  },
]);

```

Where:

name
: Is the route name used when you use ```this.route.pushRoute(route_name)```   in the base_components.

path
: Is the express-style path expressions 

url (optional)
: Is the function called by route_link component in order to create the href parameter, if this parameter is not provided path will be used instead.

