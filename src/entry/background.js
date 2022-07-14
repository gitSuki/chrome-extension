chrome.runtime.onMessage.addListener(async function(url, sender, sendResponse) {
  console.log(url)
  // response = await fetch(url)
  // data = await response.text()
  // return data
})