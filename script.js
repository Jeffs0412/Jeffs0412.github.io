// Getting other elements
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const twitterButton = document.querySelector('#twitter');
const newQuoteButton = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');
let apiQuotes;

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    loading(); // Call the loading function first
    // Pick a random quote from apiQuotes Array based on the random number below
    const randomNumber = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[randomNumber];
    // Check if the Author field is blank and replace it with "Anonymous" 
    if (!quote.author) {
        quoteAuthor.textContent = "- Anonymous";
    } else {
        quoteAuthor.textContent = `- ${quote.author}`;
    }
    // Check Quote Length to determine the styling //
    if (quote.text.length > 100) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    // Insert the Random Quote and Hide the loader with complete() function
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        // Set the Array of quotes to apiQuotes
        apiQuotes = await response.json(); // This contains an array of texts and authors
        // Get a random quote by calling the newQuote() function
        newQuote(); 
    }  catch(error) {
        console.log(error);
    }
}

// Tweet the Quote by inserting the quote to the text query of twitter URL
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, "_blank");
}

newQuoteButton.addEventListener('click', newQuote)
twitterButton.addEventListener('click', tweetQuote)

getQuotes();

<<<<<<< HEAD:Quote_Generator.js
// var a = new String("Hello");

// var b = "Hello";

// if (a ===b){

// alert("Same");

// }else{

// alert("Different");

// }

// console.log(b);
=======
>>>>>>> ba631b57a60d16ad41a1e1863b8e8fe77d85f5cb:script.js
