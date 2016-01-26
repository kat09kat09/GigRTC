# gigg.tv

Twitch.TV for live performances

## Team

  - __Product Owner__: Auggie
  - __Scrum Master__: V
  - __Development Team Members__: Kat, Madeline

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    2. [Deploying to Heroku] (#deploying-to-heroku)
    1. [Roadmap](#roadmap)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
cd gigg
npm install
cd client
bower install
```

### Deploying to Heroku

Because the package.json is not in the root directory of this repo, you must deploy a subtree when you push the repo to Heroku:  

```git subtree push --prefix gigg heroku master```

### Roadmap

View the project roadmap at https://waffle.io/TeamDreamStream/GigRTC


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
