var myWindowId;
const entryListing = document.querySelector("#entries");

function addKeyword(word) {
  console.log("adding keyword");
}

function handleKeywordMatch(message, sender, sendResponse) {
  let listingMsg = "Header " + message.header + " contained " + message.keyword;
  listEntry = document.createElement("li");
  listEntry.textContent = listingMsg;
  entryListing.append(listEntry);

  //   entryListing.append("<li>" + listingMsg + "</li>");
}

browser.runtime.onMessage.addListener(handleKeywordMatch);
