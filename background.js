var storedItems = [];
var storedsearchString = browser.storage.sync.get("searchString");
storedsearchString.then((res) => {
  console.log("ok got searchString " + res.searchString);
  storedItems.push(res.searchString);
});

function handleStorageChange(changes, area) {
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
function handleClickOpenOptionsPage() {
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
browser.browserAction.onClicked.addListener(handleClickOpenOptionsPage);

// register storage change handlers
browser.storage.onChanged.addListener(handleStorageChange);
