const url = 'https://kitsunekko.net/dirlist.php?dir=subtitles%2Fjapanese%2F';
const baseURL = 'https://kitsunekko.net';
module.exports = { url, baseURL, fetchData, parseData, cacheData, getCache }

async function fetchData(){
  const response = await fetch(url)
  const data = await response.text()
  return data
} 

function parseData(data){
  // convert the data to HTML to traverse with DOM methods
  const HTML = document.createElement('html');
  HTML.innerHTML = data;
  const rows = HTML.getElementsByTagName('tr');
  let subsDict = [...rows].map(tr => ({
    'title': tr.firstChild.textContent,
    'href': baseURL + tr.firstChild.firstChild.pathname + tr.firstChild.firstChild.search,
    'lastUpdated': tr.children[1].title
  }));
  return subsDict;
}

function cacheData(data){
  chrome.storage.local.set({kitsunekkoCache: data});
}

function getCache(){
  chrome.storage.local.get(['kitsunekkoCache'], result => {
    chrome.runtime.sendMessage(result)
    chrome.runtime.sendMessage("Cache data retrieved")
  });
}