# Configuration[^top]

> "There are mountains beyond mountains, and heavens beyond heavens"
> "The universe conspires in my favour"

Here's is a small guide for configuration for this app and dev-gui :nerd_face:

My website [Perseverancia](https://perseverancia.ar)

Licensed under [MIT License](LICENSE)

Made by @FelixRiddle

###### TODO:

- [X] Make a functional website
  - [X] The website must be able to communicate with the backend server dev-gui
  <!-- Use \() to escape parethenses -->
- [ ] \(Optional) Make it look nice :D
- [ ] Apps
  <!-- Only for apps Devtools compatible and not deprecated should this be done -->
  <!-- Also a flag like "core": true, should be added and one like "optional": true
  to settings.json of every Devtools compatible package. -->
  - [ ] Setup and build apps that are DevTools compatible automatically.
    - [ ] On start, check for app dependencies and install them.
      - [ ] Python packages
        - [ ] Get installed python packages list
        - [ ] Get a list of packages needed by the apps.
          - [ ] Install those who aren't
      - [ ] Node modules
        - [ ] Get installed modules list
        - [ ] Get a list of modules needed by the apps.
          - [ ] Install those who aren't
    - [ ] If they are running, automatically restart them.
  - [ ] App
    - [X] Show app status.
    - [X] Make operations on the given app(like start, stop, etc.).
    - [X] Edit .env variables.
    - [ ] Auto-Detect app type(whether it's Node.js, python, rust, etc.).

## Setup and run[^setup]

Just run these two commands:

```
npm i
npm run dev
```

## App settings[^settings.json]

For how to configure settings.json on repositories check the file, settings.json.spec.js on\
dev-tools-standards repository.

[^top]: Back to top
[^setup]:
    Go back to setup
[^settings.json] settings.json
