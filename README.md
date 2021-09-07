Bangle.js App Loader (and Apps)
================================

[![Build Status](https://travis-ci.org/espruino/BangleApps.svg?branch=master)](https://travis-ci.org/espruino/BangleApps)

* Try the **release version** at [banglejs.com/apps](https://banglejs.com/apps)
* Try the **development version** at [github.io](https://espruino.github.io/BangleApps/)

**All software (including apps) in this repository is MIT Licensed - see [LICENSE](LICENSE)** By
submitting code to this repository you confirm that you are happy with it being MIT licensed,
and that it is not licensed in another way that would make this impossible.

## How does it work?

* A list of apps is in `apps.json`
* Each element references an app in `apps/<id>` which is uploaded
* When it starts, BangleAppLoader checks the JSON and compares
it with the files it sees in the watch's storage.
* To upload an app, BangleAppLoader checks the files that are
listed in `apps.json`, loads them, and sends them over Web Bluetooth.

## Getting Started

Check out:

* [Building your first Bangle.js Application](https://www.espruino.com/Bangle.js+First+App)
* [Adding an app to the Bangle.js App Loader](https://www.espruino.com/Bangle.js+App+Loader)
* [Customising the App Loader](https://www.espruino.com/Bangle.js+App+Loader+Custom)

## What filenames are used

Filenames in storage are limited to 28 characters. To
easily distinguish between file types, we use the following:

* `stuff.info` is JSON that describes an app - this is auto-generated by the App Loader
* `stuff.img` is an image
* `stuff.app.js` is JS code for applications
* `stuff.wid.js` is JS code for widgets
* `stuff.settings.js` is JS code for the settings menu
* `stuff.boot.js` is JS code that automatically gets run at boot time
* `stuff.json` is used for JSON settings for an app

## Developing your own app

* Head over to [the Web IDE](https://www.espruino.com/ide/) and ensure `Save on Send` in settings set to the *default setting* of `To RAM`
* We'd recommend that you start off using code from 'Example Applications' (below) to get started...
* Load [`app.js`](apps/_example_app/app.js) or [`widget.js`](apps/_example_widget/widget.js) into the IDE and start developing.
* The `Upload` button will load your app to Bangle.js temporarily

## Adding your app to the menu

* Come up with a unique (all lowercase, nu spaces) name, we'll assume `7chname`. Bangle.js
is limited to 28 char filenames and appends a file extension (eg `.js`) so please
try and keep filenames short to avoid overflowing the buffer.
* Create a folder called `apps/<id>`, lets assume `apps/7chname`
* We'd recommend that you copy files from 'Example Applications' (below) as a base, or...
* `apps/7chname/app.png` should be a 48px icon
* Use http://www.espruino.com/Image+Converter to create `apps/7chname/app-icon.js`, using a 1 bit, 4 bit or 8 bit Web Palette "Image String"
* Create an entry in `apps.json` as follows:

```
{ "id": "7chname",
  "name": "My app's human readable name",
  "shortName" : "Short Name",
  "icon": "app.png",
  "description": "A detailed description of my great app",
  "tags": "",
  "storage": [
    {"name":"7chname.app.js","url":"app.js"},
    {"name":"7chname.img","url":"app-icon.js","evaluate":true}
  ],
},
```

## Testing

### Online

This is the best way to test...

* Fork the https://github.com/espruino/BangleApps git repository
* Add your files
* Go to GitHub Settings and activate GitHub Pages
* Run your personal `Bangle App Loader` at https://\<your-github-username\>.github.io/BangleApps/index.html to load apps onto your device
* Your apps should be inside it - if there are problems, check your web browser's 'developer console' for errors

**Note:** It's a great idea to get a local copy of the repository on your PC,
then run `bin/sanitycheck.js` - it'll run through a bunch of common issues
that there might be.

Be aware of the delay between commits and updates on github.io - it can take a few minutes (and a 'hard refresh' of your browser) for changes to take effect.

### Offline

Using the 'Storage' icon in [the Web IDE](https://www.espruino.com/ide/)
(4 discs), upload your files into the places described in your JSON:

* `app-icon.js` -> `7chname.img`

Now load `app.js` up in the editor, and click the down-arrow to the bottom
right of the `Send to Espruino` icon. Click `Storage` and then either choose
`7chname.app.js` (if you'd uploaded your app previously), or `New File`
and then enter `7chname.app.js` as the name.

Now, clicking the `Send to Espruino` icon will load the app directly into
Espruino **and** will automatically run it.

When you upload code this way, your app will even be uploaded to Bangle.js's menu
without you having to use the `Bangle App Loader`

**Note:** Widgets need to be run inside a clock or app, so if you're
developing a widget you need to go go `Settings` -> `Communications` -> `Load after saving`
and set it to `Load default application`.

## Example Applications

To make the process easier we've come up with some example applications that you can use as a base
when creating your own. Just come up with a unique 7 character name, copy `apps/_example_app`
or `apps/_example_widget` to `apps/7chname`, and add `apps/_example_X/add_to_apps.json` to
`apps.json`.

**If you're making a widget** please start the name with `wid` to make
it easy to find!

### App Example

The app example is available in [`apps/_example_app`](apps/_example_app)

Apps are listed in the Bangle.js menu, accessible from a clock app via the middle button.

* `add_to_apps.json` - insert into `apps.json`, describes the app to bootloader and loader
* `app.png` - app icon - 48x48px
* `app-icon.js` - JS version of the icon (made with http://www.espruino.com/Image+Converter) for use in Bangle.js's menu
* `app.js` - app code

#### `app-icon.js`

The icon image and short description is used in Bangle.js's launcher.

Use the Espruino [image converter](https://www.espruino.com/Image+Converter) and upload your `app.png` file.

Follow this steps to create a readable icon as image string.

1. upload a png file
2. set _X_ Use Compression
3. set _X_ Transparency (optional)
4. set Diffusion: _flat_
5. set Colours: _1 bit_, _4 bit_ or _8 bit Web Palette_
6. set Output as: _Image String_

Replace this line with the image converter output:

```
require("heatshrink").decompress(atob("mEwwJC/AH4A/AH4AgA=="))
```

You can also use this converter for creating images you like to draw with `g.drawImage()` with your app.

Apps that need widgets can call `Bangle.loadWidgets()` **once** at startup to load
them, and then `Bangle.drawWidgets()` to draw them onto the screen whenever the app
has call to completely clear the screen. Widgets themselves will update as and when needed.

### Widget Example

The widget example is available in [`apps/_example_widget`](apps/_example_widget)

* `add_to_apps.json` - insert into `apps.json`, describes the widget to bootloader and loader
* `widget.js` - widget code

Widgets are just small bits of code that run whenever an app that supports them
calls `Bangle.loadWidgets()`. If they want to display something in the 24px high
widget bars at the top and bottom of the screen they can add themselves to
the global `WIDGETS` array with:

```
WIDGETS["mywidget"]={
  area:"tl", // tl (top left), tr (top right), bl (bottom left), br (bottom right)
  width: 24, // how wide is the widget? You can change this and call Bangle.drawWidgets() to re-layout
  draw:draw // called to draw the widget
};
```

When the widget is to be drawn, `x` and `y` values are set up in `WIDGETS["mywidget"]`
and `draw` can then use `this.x` and `this.y` to figure out where it needs to draw to.


### `app.info` format

This is the file that's **auto-generated** and loaded onto Bangle.js by the App Loader,
and which gives information about the app for the Launcher.

```
{
  "name":"Short Name", // for Bangle.js menu
  "icon":"*7chname", // for Bangle.js menu
  "src":"-7chname", // source file
  "type":"widget/clock/app/bootloader", // optional, default "app"
     // if this is 'widget' then it's not displayed in the menu  
     // if it's 'clock' then it'll be loaded by default at boot time
     // if this is 'bootloader' then it's code that is run at boot time, but is not in a menu  
  "version":"1.23",
     // added by BangleApps loader on upload based on apps.json
  "files:"file1,file2,file3",
     // added by BangleApps loader on upload - lists all files
     // that belong to the app so it can be deleted
  "data":"appid.data.json,appid.data?.json;appidStorageFile,appidStorageFile*"
     // added by BangleApps loader on upload - lists files that
     // the app might write, so they can be deleted on uninstall
     // typically these files are not uploaded, but created by the app
     // these can include '*' or '?' wildcards
}
```

### `apps.json` format

```
{ "id": "appid",              // 7 character app id
  "name": "Readable name",    // readable name
  "shortName": "Short name",  // short name for launcher
  "icon": "icon.png",         // icon in apps/
  "description": "...",       // long description (can contain markdown)
  "type":"...",               // optional(if app) -  
                              //   'app' - an application
                              //   'widget' - a widget
                              //   'launch' - replacement launcher app
                              //   'bootloader' - code that runs at startup only
                              //   'RAM' - code that runs and doesn't upload anything to storage
  "tags": "",                 // comma separated tag list for searching
  "dependencies" : { "notify":"type" } // optional, app 'types' we depend on
                              // for instance this will use notify/notifyfs is they exist, or will pull in 'notify'
  "readme": "README.md",      // if supplied, a link to a markdown-style text file
                              // that contains more information about this app (usage, etc)
                              // A 'Read more...' link will be added under the app

  "custom": "custom.html",    // if supplied, apps/custom.html is loaded in an
                              // iframe, and it must post back an 'app' structure
                              // like this one with 'storage','name' and 'id' set up
                              // see below for more info

  "customConnect": true,      // if supplied, ensure we are connected to a device
                              // before the "custom.html" iframe is loaded. An
                              // onInit function in "custom.html" is then called
                              // with info on the currently connected device.                 

  "interface": "interface.html",   // if supplied, apps/interface.html is loaded in an
                              // iframe, and it may interact with the connected Bangle
                              // to retrieve information from it
                              // see below for more info

  "allow_emulator":true,      // if 'app.js' will run in the emulator, set to true to
                              // add an icon to allow your app to be tested

  "storage": [                // list of files to add to storage
    {"name":"appid.js",       // filename to use in storage.
                              // If name=='RAM', the code is sent directly to Bangle.js and is not saved to a file
     "url":"",                // URL of file to load (currently relative to apps/)
     "content":"...",         // if supplied, this content is loaded directly
     "evaluate":true,         // if supplied, data isn't quoted into a String before upload
                              // (eg it's evaluated as JS)
     "noOverwrite":true       // if supplied, this file will not be overwritten if it
                              // already exists
    },
  ]
  "data": [                   // list of files the app writes to
    {"name":"appid.data.json",  // filename used in storage
     "storageFile":true       // if supplied, file is treated as storageFile
     "url":"",                // if supplied URL of file to load (currently relative to apps/)
     "content":"...",         // if supplied, this content is loaded directly     
     "evaluate":true,         // if supplied, data isn't quoted into a String before upload
                              // (eg it's evaluated as JS)     
    },
    {"wildcard":"appid.data.*" // wildcard of filenames used in storage
    },                         // this is mutually exclusive with using "name"
  ],
  "sortorder" : 0,            // optional - choose where in the list this goes.
                              // this should only really be used to put system
                              // stuff at the top
}
```

* name, icon and description present the app in the app loader.
* tags is used for grouping apps in the library, separate multiple entries by comma. Known tags are `tool`, `system`, `clock`, `game`, `sound`, `gps`, `widget`, `launcher` or empty.
* storage is used to identify the app files and how to handle them
* data is used to clean up files when the app is uninstalled

### `apps.json`: `custom` element

Apps that can be customised need to define a `custom` element in `apps.json`,
which names an HTML file in that app's folder.

When `custom` is defined, the 'upload' button is replaced by a customize
button, and when clicked it opens the HTML page specified in an iframe.

In that HTML file you're then responsible for handling a button
press and calling `sendCustomizedApp` with your own customised
version of what's in `apps.json`:

```
<html>
  <head>
    <link rel="stylesheet" href="../../css/spectre.min.css">
  </head>
  <body>
    <p><button id="upload" class="btn btn-primary">Upload</button></p>
    <script src="../../lib/customize.js"></script>
    <script>
      document.getElementById("upload").addEventListener("click", function() {
        sendCustomizedApp({
          id : "7chname",
          storage:[
            {name:"7chname.app.js", url:"app.js", content:app_source_code},
            {name:"7chname.img", content:'require("heatshrink").decompress(atob("mEwg...4"))', evaluate:true},
          ]
        });
      });
    </script>
  </body>
</html>
```

This'll then be loaded in to the watch. See [apps/qrcode/grcode.html](the QR Code app)
for a clean example.

**Note:** we specify a `url` for JS files even though it doesn't have to exist
and will never be loaded. This is so the app loader can tell if it's a JavaScript
file based on the extension, and if so it can minify and pretokenise it.

### `apps.json`: `interface` element

Apps that create data that can be read back can define a `interface` element in `apps.json`,
which names an HTML file in that app's folder.

When `interface` is defined, a `Download from App` button is added to
the app's description, and when clicked it opens the HTML page specified
in an iframe.

```
<html>
  <head>
    <link rel="stylesheet" href="../../css/spectre.min.css">
  </head>
  <body>
    <script src="../../lib/interface.js"></script>
    <div id="t">Loading...</div>
    <script>
      function onInit() {
        Puck.eval("E.getTemperature()", temp=> {
          document.getElementById("t").innerHTML = temp;
        });
      }
    </script>
  </body>
</html>
```

When the page is ready a function called `onInit` is called,
and in that you can call `Puck.write` and `Puck.eval` to get
the data you require from Bangle.js.

See [apps/gpsrec/interface.html](the GPS Recorder) for a full example.

### Adding configuration to the "Settings" menu

Apps (or widgets) can add their own settings to the "Settings" menu under "App/widget settings".   
To do so, the app needs to include a `settings.js` file, containing a single function
that handles configuring the app.   
When the app settings are opened, this function is called with one
argument, `back`: a callback to return to the settings menu.

Usually it will save any information in `app.json` where `app` is the name
of your app - so you should change the example accordingly.

Example `settings.js`
```js
// make sure to enclose the function in parentheses
(function(back) {
  let settings = require('Storage').readJSON('app.json',1)||{};
  function save(key, value) {
    settings[key] = value;
    require('Storage').write('app.json',settings);
  }
  const appMenu = {
    '': {'title': 'App Settings'},
    '< Back': back,
    'Monkeys': {
      value: settings.monkeys||12,
      onchange: (m) => {save('monkeys', m)}
    }   
  };
  E.showMenu(appMenu)
})
```
In this example the app needs to add `app.settings.js` to `storage` in `apps.json`.   
It should also add `app.json` to `data`, to make sure it is cleaned up when the app is uninstalled.
```json
  { "id": "app",
    ...
    "storage": [
      ...
      {"name":"app.settings.js","url":"settings.js"},
    ],
    "data": [
      {"name":"app.json"}
    ]
  },
```

## Modules

You can include any of [Espruino's modules](https://www.espruino.com/Modules) as
normal with `require("modulename")`. If you want to develop your own module for your
app(s) then you can do that too. Just add the module into the `modules` folder
then you can use it from your app as normal.

You won't be able to develop apps using your own modules with the IDE,
so instead we'd recommend you write your module to a Storage File called
`modulename` on Bangle.js. You can then develop your app as normal on Bangle.js
from the IDE.

## Coding hints

- use `g.setFont(.., size)` to multiply the font size, eg ("6x8",3) : "18x24"

- use `g.drawString(text,x,y,true)` to draw with background color to overwrite existing text

- use `g.clearRect()` to clear parts of the screen, instead of using `g.clear()`

- use `g.fillPoly()` or `g.drawImage()` for complex graphic elements

- using `g.clear()` can cause screen flicker

- using `g.setLCDBrightness()` can save you power during long periods with lcd on

- chaining graphics methods, eg `g.setColor(0xFD20).setFontAlign(0,0).setfont("6x8",3)`

### Misc Notes

- Need to save state? Use the `E.on('kill',...)` event to save JSON to a file called `7chname.json`, then load it at startup.

- 'Alarm' apps define a file called `alarm.js` which handles the actual alarm window.

- Locale is handled by `require("locale")`. An app may create a `locale` file in Storage which is
a module that overwrites Bangle.js's default locale.


### Graphic areas

The screen is parted in a widget and app area for lcd mode `direct`(default).

| areas | as rectangle or point |
| :-:| :-: |
| Widget | (0,0,239,23) |
| Widget bottom bar (optional) | (0,216,239,239) |
| Apps | (0,24,239,239) (see below) |
| BTN1 | (230, 55)  |
| BTN2 | (230, 140) |
| BTN3 | (230, 210) |
| BTN4 | (0,0,119, 239)|
| BTN5 |  (120,0,239,239) |

- If there are widgets at the bottom of the screen, apps should actually keep the bottom 24px free, so should keep to the area (0,24,239,215)

- Use `g.setFontAlign(0, 0, 3)` to draw rotated string to BTN1-BTN3 with `g.drawString()`.

- For BTN4-5 the touch area is named

## Available colors

You can use `g.setColor(r,g,b)` OR `g.setColor(16bitnumber)` - some common 16 bit colors are below:

| color-name | color-value|
| :-: | :-: |
| Black | 0x0000 |
| Navy | 0x000F |
| DarkGreen | 0x03E0 |
| DarkCyan | 0x03EF |
| Maroon | 0x7800 |
| Purple | 0x780F |
| Olive | 0x7BE0
| LightGray | 0xC618
| DarkGrey | 0x7BEF
| Blue | 0x001F
| Green | 0x07E0 |
| Cyan | 0x07FF |
| RED | 0xF800 |
| Magenta | 0xF81F |
| Yellow | 0xFFE0 |
| White | 0xFFFF |
| Orange | 0xFD20 |
| GreenYellow | 0xAFE5 |
| Pink | 0xF81F |

## API Reference

[Reference](http://www.espruino.com/Reference#software)

[Bangle Class](https://banglejs.com/reference#Bangle)

[Graphics Class](https://banglejs.com/reference#Graphics)

## 'Testing' folder

The [`testing`](testing) folder contains snippets of code that might be useful for your apps.

* `testing/colors.js` - 16 bit colors as name value pairs
* `testing/gpstrack.js` - code to store a GPS track in Bangle.js storage and output it back to the console
* `testing/map` - code for splitting an image into map tiles and then displaying them

## Credits

The majority of icons used for these apps are from [Icons8](https://icons8.com/) - we have a commercial license but icons are also free for Open Source projects.
