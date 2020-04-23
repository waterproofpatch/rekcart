var myWindowId;
const contentBox = document.querySelector("#content");

function addKeyword(word) {
  console.log("adding keyword");
}

function handleKeywordMatch(message, sender, sendResponse) {
  console.log("got a message " + message + " from " + sender);
}

browser.runtime.onMessage.addListener(handleKeywordMatch);
