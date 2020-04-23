var storedItems = [];
var storedSearchString = browser.storage.sync.get("searchString");

storedSearchString.then((res) => {
  console.log("ok got searchString " + res.searchString);
  storedItems.push(res.searchString);
});

function storageChangedHandler(changes, area) {
  console.log("Change in storage area: " + area);

  let changedItems = Object.keys(changes);
  storedItems = [];
  for (let item of changedItems) {
    if (item === "searchString") {
      console.log("Changing searchString ...");
      storedItems.push(changes[item].newValue);
    }
  }
}

// handle requests after headers are prepared, but before they are sent
function beforeHeadersHandler(e) {
  for (var header of e.requestHeaders) {
    if (header.name.toLowerCase() === "user-agent") {
      console.log("Checking header " + header.name);
      for (let storedItem of storedItems) {
        if (header.value.search(storedItem) >= 0) {
          console.log(
            "Found '" + storedItem + "' value for header '" + header.name + "'"
          );
          msg = browser.runtime.sendMessage({
            greeting: "test",
          });
          msg.then(
            () => {
              console.log("sent!");
            },
            (e) => {
              console.log("failed: " + e);
            }
          );
        } else {
          console.log(storedItem + " not in " + header.name);
        }
      }
    }
  }
}

// handle requests before headers are ready (can intercept form data this way)
function beforeRequestHandler(e) {}

// click handlers
function openOptionsPageHandler() {
  browser.runtime.openOptionsPage();
}

// register web request handlers
browser.webRequest.onBeforeRequest.addListener(
  beforeRequestHandler,
  {
    urls: ["<all_urls>"],
  },
  ["requestBody"]
);

browser.webRequest.onBeforeSendHeaders.addListener(
  beforeHeadersHandler,
  {
    urls: ["<all_urls>"],
  },
  ["requestHeaders", "blocking"]
);

// register click handlers
browser.browserAction.onClicked.addListener(openOptionsPageHandler);

// register storage change handlers
browser.storage.onChanged.addListener(storageChangedHandler);
