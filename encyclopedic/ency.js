//const message = 'Solution using Promises';
const msg = document.querySelector('.lazy-text')
const con = msg.textContent;
const typingPromises = (con, timeout) =>
  [...con].map(
    (ch, i) =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(con.substring(0, i + 1));
        }, timeout * i);
      })
  );

typingPromises(con, 130).forEach(promise => {
  promise.then(portion => {
    document.querySelector('p').innerHTML = portion;
  });
});



// Get the required elements from the DOM
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");

// Function to perform the search operation
function performSearch() {
  // Clear previous search results
  searchResults.innerHTML = "";

  // Get the search query from the input field
  const query = searchInput.value.trim();

  // Get all the text nodes in the document body
  const textNodes = getTextNodes(document.body);

  // Loop through the text nodes and find matches
  textNodes.forEach((node) => {
    const text = node.textContent;
    const regex = new RegExp(query, "gi");
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      const matchedWord = match[0];
      const beforeMatch = text.substring(lastIndex, match.index);
      const afterMatch = text.substring(match.index + matchedWord.length);

      // Create a text node for the text before and after the match
      const beforeNode = document.createTextNode(beforeMatch);
      const afterNode = document.createTextNode(afterMatch);

      // Create a span element for the matched word and add the highlight class
      const span = document.createElement("span");
      span.className = "highlight";
      span.textContent = matchedWord;

      // Append the nodes to the search results div
      searchResults.appendChild(beforeNode);
      searchResults.appendChild(span);
      searchResults.appendChild(afterNode);

      lastIndex = match.index + matchedWord.length;
    }
  });
}

// Helper function to retrieve all text nodes within an element
function getTextNodes(element) {
  const textNodes = [];

  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push(node);
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        traverse(node.childNodes[i]);
      }
    }
  }

  traverse(element);
  return textNodes;
}

// Add click event listener to the search button
searchButton.addEventListener("click", performSearch);

// Handle keydown event for Ctrl+F (or Command+F on macOS)
document.addEventListener("keydown", (event) => {
  const isCtrlKey = event.ctrlKey || event.metaKey;
  const isFKey = event.key === "f" || event.key === "F";

  if (isCtrlKey && isFKey) {
    event.preventDefault();
    searchInput.focus();
  }
});
