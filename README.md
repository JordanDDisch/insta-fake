## Hey Reviewer from Mobiquity

This is a monorepo starter kit for cross platform apps. I've stripped out the Next stuff and just kept the Expo/React Native implementation for simplicity.

I used this starter kit as recently i've been working on a crossplatform app and am quite familiar with how this library works.

Normally I would use a full 100% only native UI library, but thought this would be cool for you to see how cross platform architecure would look like (if your not already familiar).

You can read the below information, which is modified from the original to understand more about the structure of the app.

The installation steps, run steps and test steps are below. 

## 🗂 Folder layout

The main apps are:

- `expo` (native)
- `next` (web, this is no longer there for the simplicty of the assignment) 

- `packages` shared packages across apps
  - `ui` includes the custom UI kit that will be optimized by Tamagui
  - `app` you'll be importing most files from `app/`
    - `pages` (we do this on our current cross platform app)
    - `components` (blocks of code that make up the pages)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)

## 🏁 Start the app

- Install dependencies: `yarn`

- Expo local dev: `yarn native`
- Then run the app on you choosen platoform (iOS or Android)

## Run the tests
- yarn jest

## UI Kit

Note we're following the [design systems guide](https://tamagui.dev/docs/guides/design-systems) and creating our own package for components.

See `packages/ui` named `@my/ui` for how this works.
