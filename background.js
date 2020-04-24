var searchStrings = [];
var storedSearchString = browser.storage.sync.get("searchString");

// on startup, add the search string from storage to our list of
// strings to monitor for
storedSearchString.then((res) => {
  console.log("ok got searchString " + res.searchString);
  searchStrings.push(res.searchString);
});

// when a keyword is added to storage
function storageChangedHandler(changes, area) {
  console.log("Change in storage area: " + area);

  let changedItems = Object.keys(changes);
  for (let item of changedItems) {
    if (item === "searchString") {
      console.log("Adding searchString " + changes[item].newValue);
      searchStrings.push(changes[item].newValue);
    }
  }
}

// handle requests after headers are prepared, but before they are sent
function beforeHeadersHandler(e) {
  for (var header of e.requestHeaders) {
    console.log("Checking header " + header.name);
    for (let storedItem of searchStrings) {
      if (header.value.search(storedItem) >= 0) {
        console.log(
          "Found '" + storedItem + "' value for header '" + header.name + "'"
        );
        msg = browser.runtime.sendMessage({
          header: header.name,
          keyword: storedItem,
        });
        msg.then(
          () => {
            console.log("message sent successfully...");
          },
          (e) => {
            console.log("failed sending message: " + e);
          }
        );
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
