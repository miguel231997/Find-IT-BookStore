const DOMAIN = 'https://api.itbook.store/1.0/search/'; //main API link
const alterDOMAIN = 'https://api.itbook.store/1.0/new';

let bookList = document.querySelector(".book-list"); //selects the booklist class where data will appended
let userSearch = ""; //userSearch input     
let term = ""; //user search input when the user is typing
let page =""; //user page input
let pageInput = document.querySelector("#form1"); 
let textInput = document.querySelector("#blank"); //selecting the input box to keep track of what the user is typing
let newBooks = document.querySelector("#bcategory"); //display new releases on the page
let newBooks1 = document.querySelector("#acategory");
let saveIcon = document.querySelector("#save-button"); //stores value of the save-button

newBooks1.addEventListener("click",function(){
    getNewBooks();
    document.querySelector("#blank").value = "";
    document.querySelector("#form1").value = "";
    document.getElementById("blank").placeholder = "search books";
    document.getElementById("form1").placeholder = "page #";
})
newBooks.addEventListener("click",function(){ //when new releases tab is clicked new books are rendered on the page
    getNewBooks(); // calls the new books function
    document.querySelector("#blank").value = "";
    document.querySelector("#form1").value = "";
    document.getElementById("blank").placeholder = "search books";
    document.getElementById("form1").placeholder = "page #";
})

async function getNewBooks(){  //new book function that reads from the new API link that returns new books
    try{
        let theNewBooks = await axios.get(`${alterDOMAIN}`); //new books api
        newData = theNewBooks.data.books; //newData includes the new books
        renderBooks(newData); //the newData gets sent to the renderBooks function to load books to the webpage
    }catch(error){  //catches errors if any
        console.log(error); //console those errors
    }
    
}




pageInput.addEventListener("input",function(e){
    let page = e.target.value.split(" ").join("+").toLowerCase();
    getBooks(term,page);
});
textInput.addEventListener("input",function(e){   //main event listener, keeps track of what the user is typing
    term = e.target.value.split(" ").join("+").toLowerCase(); //logs what user is typing into term variable
    getBooks(term);  //sends the search result to the getBooks function to retrieve the data
});

async function getBooks(term,page){     //main axios function, returns books
    let url; //url variable
    if(page){ //if the user types in a page then the following link is used
        url = (`${DOMAIN}${term}/${page}`); //url is equal to this now
    }else{ //else
        url = (`${DOMAIN}${term}`); //url is equal to this
    }
    
    try{
        let theBooks = await axios.get(url); //the axios call
        data = theBooks.data.books; //data now contains the results of the axios call
        // let dataPages = await axios.get(`${DOMAIN}${term}/${page}`);
        // dataByPage = dataPages.data.page;
        console.log(data); // data for testing on console
        //pageSelector(dataByPage);
        renderBooks(data); //we send the axios results so that the results can now be displayed on the page
    }catch(error){   //catching errors if any
        console.log(error); //consoles error to console in inspector
    }
}



function renderBooks(data){  //function to render books into page
    bookList.innerHTML = "" //after each render elements on the page get removed
        data.forEach((book) => {   //for loop to cycle through all the results from the axios call
            let image = document.createElement("img");  //creating an image element to return images of the data
            image.setAttribute("id","myImg")
            image.setAttribute("src",book.image); //gives the src to the image to display the image
            bookList.append(image); //appends the image to the page so that it is visible
            let modal = document.getElementById("myModal");
            let modalImg = document.getElementById("img01");
            let captionText = document.getElementById("caption");
            let price = document.getElementById("price");
            let link = document.getElementById("link");
            link.setAttribute("href",book.url);

            image.addEventListener("click",function(){ //clicking on an image brings up the modal
                modal.style.display = "block"; //displays the modal
                modalImg.src = this.src; //the modal contains what the current image is
                captionText.innerHTML = book.title; //ading the title of the current book
                price.innerHTML = book.price; //adding price
                link.innerHTML = book.url //adding the link to the book
            });
                let span = document.getElementsByClassName("close")[0];
                // When the user clicks on <span> (x), close the modal
                span.addEventListener("click",function() { 
                modal.style.display = "none";
                });

        
        })
}





// Get the <span> element that closes the modal


