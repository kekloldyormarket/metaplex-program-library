# mpl-update_metadata

This package contains the update_metadata contract SDK code.

## API Docs

Find the
[update_metadata API docs published here](https://metaplex-foundation.github.io/metaplex-program-library/docs/update_metadata/index.html).

## Developing

In order to update the generated SDK when the rust contract was updated please run:

```
yarn gen:api
```

and then update the wrapper code and tests.

## LICENSE

Apache v2.0

## Test

To run tests locally use

```
yarn amman:start
yarn build
yarn test
```
