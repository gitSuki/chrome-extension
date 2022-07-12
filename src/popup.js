'use strict';
const mal = require('./malFetch')
const anilist = require('./anilistFetch')
const searchbar = document.getElementById('searchbar');
const malButton = document.getElementById('myanimelist');
const anilistButton = document.getElementById('anilist');
const searchResultsContainer = document.getElementById('container');
const delay = milliseconds => new Promise(res => setTimeout(res, milliseconds));

(function loadStorageData (){
  // loads the users site preference from storage
  chrome.storage.sync.get(['preference'], result => {
    if (result.preference === malButton.id){
      malButton.checked = true;
    }
    else {
      anilistButton.checked = true;
    }
  })
  // loads the users previous search from storage
  chrome.storage.sync.get(['search'], result => {
    searchbar.value = result.search;
    animeSearch(result.search)
  })
})()

searchbar.addEventListener('keyup', async () => {
  // calls helper search function when the user inputs into the searchbar
  const animeID = searchbar.value;
  await delay(500); // to allow users enough time to type in their search query
  animeSearch(animeID)
})

async function animeSearch(query){
  // redirects to helper functions based on which radio button is selected
  if (malButton.checked){
    malSearch(query);   
  }
  else if (anilistButton.checked) {
    anilistSearch(query);
  }
}

async function malSearch(animeID){
  const animeData = await mal.fetchAnimeByID(animeID);
  searchResultsContainer.textContent = animeData.data.title;
  saveSearchData(animeID)
}

async function anilistSearch(animeID){
  const animeData = await anilist.fetchAnimeByID(anilist.query, {id:animeID});
  searchResultsContainer.textContent = animeData.title.english;
  saveSearchData(animeID)
}

malButton.addEventListener('click', () => {
  saveAnimeSitePreference(malButton.id);
  animeSearch(searchbar.value);
})

anilistButton.addEventListener('click', () => {
  saveAnimeSitePreference(anilistButton.id);
  animeSearch(searchbar.value);
})

function saveAnimeSitePreference (animeSitePreference){
  chrome.storage.sync.set({preference: animeSitePreference});
}

function saveSearchData (searchData){
  chrome.storage.sync.set({search: searchData});
}

// (function () {
//   // We will make use of Storage API to get and store `count` value
//   // More information on Storage API can we found at
//   // https://developer.chrome.com/extensions/storage

//   // To get storage access, we have to mention it in `permissions` property of manifest.json file
//   // More information on Permissions can we found at
//   // https://developer.chrome.com/extensions/declare_permissions
//   const counterStorage = {
//     get: (cb) => {
//       chrome.storage.sync.get(['count'], (result) => {
//         cb(result.count);
//       });
//     },
//     set: (value, cb) => {
//       chrome.storage.sync.set(
//         {
//           count: value,
//         },
//         () => {
//           cb();
//         }
//       );
//     },
//   };

//   function setupCounter(initialValue = 0) {
//     document.getElementById('counter').innerHTML = initialValue;

//     document.getElementById('incrementBtn').addEventListener('click', () => {
//       updateCounter({
//         type: 'INCREMENT',
//       });
//     });

//     document.getElementById('decrementBtn').addEventListener('click', () => {
//       updateCounter({
//         type: 'DECREMENT',
//       });
//     });
//   }

//   function updateCounter({ type }) {
//     counterStorage.get((count) => {
//       let newCount;

//       if (type === 'INCREMENT') {
//         newCount = count + 1;
//       } else if (type === 'DECREMENT') {
//         newCount = count - 1;
//       } else {
//         newCount = count;
//       }

//       counterStorage.set(newCount, () => {
//         document.getElementById('counter').innerHTML = newCount;

//         // Communicate with content script of
//         // active tab by sending a message
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//           const tab = tabs[0];

//           chrome.tabs.sendMessage(
//             tab.id,
//             {
//               type: 'COUNT',
//               payload: {
//                 count: newCount,
//               },
//             },
//             (response) => {
//               console.log('Current count value passed to contentScript file');
//             }
//           );
//         });
//       });
//     });
//   }

//   function restoreCounter() {
//     // Restore count value
//     counterStorage.get((count) => {
//       if (typeof count === 'undefined') {
//         // Set counter value as 0
//         counterStorage.set(0, () => {
//           setupCounter(0);
//         });
//       } else {
//         setupCounter(count);
//       }
//     });
//   }

//   document.addEventListener('DOMContentLoaded', restoreCounter);

//   // Communicate with background file by sending a message
//   chrome.runtime.sendMessage(
//     {
//       type: 'GREETINGS',
//       payload: {
//         message: 'Hello, my name is Pop. I am from Popup.',
//       },
//     },
//     (response) => {
//       console.log(response.message);
//     }
//   );
// })();
