# GitHub action to assign an alias to a now deployment

## Usage

```yml
name: deploy
on:
  push:

jobs:
  now:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: now
        id: now
        uses: shareup/now-action@master
        with:
          token: ${{ secrets.zeit_token }}
          prod: ${{ github.ref == 'refs/heads/master' }}
      - name: alias
        uses: shareup/now-alias-assign-action@master
        with:
          token: ${{ secrets.zeit_token }}
          deployment: ${{ steps.now.outputs.deployment_url }}
          alias: https://something.example.now.sh
```

## Development

You'll need:

* `node`
* `yarn`
* `hadolint`

On the mac:

```sh
$ brew install node yarn hadolint
```
