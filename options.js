function saveOptions(e) {
  browser.storage.sync.set({
    searchString: document.querySelector("#searchString").value,
  });
  e.preventDefault();
}

function restoreOptions() {
  var storageItem = browser.storage.sync.get("searchString");
  storageItem.then((res) => {
    document.querySelector("#managed-searchString").innerText =
      res.searchString;
  });

  var gettingItem = browser.storage.sync.get("searchString");
  gettingItem.then((res) => {
    document.querySelector("#searchString").value =
      res.searchString || "Firefox red";
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
