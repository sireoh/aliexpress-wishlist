## Usage <a name="usage"></a>

### Getting Started <a name="gettingStarted"></a>

#### Developing and building

This template comes with build configs for both Chrome and Firefox. Running
`dev` or `build` commands without specifying the browser target will build
for Chrome by default.

1. Clone this repository or click "Use this template"
2. Change `name` and `description` in `manifest.json`
3. Run `yarn` or `npm i` (check your node version >= 16)
4. Run `yarn dev[:chrome|:firefox]`, or `npm run dev[:chrome|:firefox]`

Running a `dev` command will build your extension and watch for changes in the
source files. Changing the source files will refresh the corresponding
`dist_<chrome|firefox>` folder.

To create an optimized production build, run `yarn build[:chrome|:firefox]`, or
`npm run build[:chrome|:firefox]`.

#### Load your extension

For Chrome

1. Open - Chrome browser
2. Access - [chrome://extensions](chrome://extensions)
3. Tick - Developer mode
4. Find - Load unpacked extension
5. Select - `dist_chrome` folder in this project (after dev or build)

For Firefox

1. Open - Firefox browser
2. Access - [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)
3. Click - Load temporary Add-on
4. Select - any file in `dist_firefox` folder (i.e. `manifest.json`) in this project (after dev or build)

## Server Setup <a name="server_setup"></a>

### Custom Progress Hook <a name="custom_progess_hook"></a>

#### Progress State Manager - Update progress on `/progress` route <a name="progress_state_manager"></a>

1. Import Progress State Manager - `from progress_state_manager import progress_manager`
2. Use `progress_manager.set_state`

```python
progress_manager.set_state(
        phase="webscraping/scraping",
        current=0,
        total=100,
        percent=0,
        message=ProgressMessages.IDLE,
    )
```

#### Test Example Routes <a name="text_example_routes"></a>

```bash
curl -X GET http://localhost:5694/example
# OUTPUT: {"message":"[GET] example"}

curl -X POST http://localhost:5694/example
# OUTPUT: {"message":"[POST] example"}

curl -X PATCH http://localhost:5694/example
# OUTPUT: {"message":"[PATCH] example"}

curl -X DELETE http://localhost:5694/example
# OUTPUT: {"message":"[DELETE] example"}
```
