﻿function start() {
    console.log("start");
    // Create script object
    var script = document.createElement('script');
    var fileName = "ExternalCatalog.js";
    // add cache bursting - assuming the script has stored the version in a variable called EXTERNAL_CATALOG_VERSION
    if (!EXTERNAL_CATALOG_VERSION) {
        var EXTERNAL_CATALOG_VERSION = "19.6.0";
    }
    fileName += "?version=" + EXTERNAL_CATALOG_VERSION;
    // Build script URL
    //var startURL = document.referrer.replace("https://", "").split("/")[0];
    var startURL = document.location.href.replace("https://", "").split("/")[0];
    console.log("url: " + startURL);
    script.src = "https://" + startURL + "/" + fileName;
    script.onload = loaded;
    document.head.appendChild(script);
}

function loaded() {
    //Connection to the catalog
    console.log("loaded");

    catalog.connect(
      {
          "scope": window,
          fn: subscribeToEvents
      }
    );
}

function subscribeToEvents() {
    //Event subscription
    console.log("connected");

    catalog.subscribe(
      "commandpage.notifyResponse",
      {
          fn: function (data, cbData) { console.log(data); console.log(cbData); },
          scope: window,
          params: "hello"
      }
    );
}