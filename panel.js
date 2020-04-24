var myWindowId;
const contentBox = document.querySelector("#content");

function addKeyword(word) {
  console.log("adding keyword");
}

function handleKeywordMatch(message, sender, sendResponse) {
  let listingMsg = "Header " + message.header + " contained " + message.keyword;
  console.log(listingMsg);
  contentBox.textContent = listingMsg;
}

browser.runtime.onMessage.addListener(handleKeywordMatch);
