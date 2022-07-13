chrome.runtime.onMessage.addListener(async function(url, sender, sendResponse) {
  response = await fetch(url)
  data = await response.text()
  return data
})