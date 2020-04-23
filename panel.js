var myWindowId;
const contentBox = document.querySelector("#content");

function addKeyword(word) {
  console.log("adding keyword");
}

function handleKeywordMatch(message, sender, sendResponse) {
  console.log("Header " + message.header + " contained " + message.keyword);
}

browser.runtime.onMessage.addListener(handleKeywordMatch);
