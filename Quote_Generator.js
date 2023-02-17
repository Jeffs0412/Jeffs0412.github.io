const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const twitterButton = document.querySelector('#twitter');
const newQuoteButton = document.querySelector('#new-quote');
const loader = document.querySelector(".loader");
let apiQuotes = [];

// Show Loading //
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading //
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
    
// Show New Quote //
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes Array //
    const randomNumber = Math.floor(Math.random()*apiQuotes.length);
    const quote = apiQuotes[randomNumber];
    // Check if the Author field is blank and replace it with "Unknown" //
    if (!quote.author) {
        quoteAuthor.textContent = "Unknown";
    }else {
        quoteAuthor.textContent = `- ${quote.author}`;
    }
    // Check Quote Length to determine the styling //
    if (quote.text.length > 100) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    // Set Quote, Hide Loader //
    quoteText.textContent = quote.text;
    complete();
}


// Get Quotes from API //
async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } 
    catch (error) {
        console.error(error);
        // Catch Error // 
    }
}

// Tweet Quote //
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners //
newQuoteButton.addEventListener('click', newQuote)
twitterButton.addEventListener('click', tweetQuote)
// On Load //
getQuotes();
