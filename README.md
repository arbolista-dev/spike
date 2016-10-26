# Spike Classes

```js
import ClientStateManager from 'spike/client/state_manager';
import ServerStateManager from 'spike/server/state_manager';
import ClientRouter from 'spike/client/router';
import ServerRouter from 'spike/server/state_manager';

import ApplicationComponent from 'spike/shared/application_component';
import BaseComponent from 'spike/shared/base_component'; // This will set context with i18n.

import Route from 'spike/shared/route.js';

import RouteLink from 'spike/shared/components/route/route.component.js';
```

# Generators

## Component Generators

Should generate components within `shared/components` as such:

```sh
spike generate component Example --where utils -t -s --rt
```

This would generate:

```
shared/components/utils/example
  example.component.js
  example.scss
  example.test
  example.rt.html
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

I have examples of each of these files we can use for templates.

## Application Generator

```sh
spike generate app
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
NODE_ENV=production spike build
```

This should build client assets (app.js, style.css, as well as a server build in build/production/server). See this article.

```sh
NODE_ENV=development spike run
```

I need to go through this more thoroughly.

# Other Requirements

- We'll want to make sure that `<img src=""/>` and any `url()` within css is compiled through webpack both when components are compiled on client and server.

# Routes

We use `path_to_regex` in order to use express-style paths, so the routes must been an array with the fallowing syntax:

```js
import Route from 'spike/client/route';
Route route = new Route([
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

