const DOMAIN = 'https://api.itbook.store/1.0/search/'; //main API link

let bookList = document.querySelector(".book-list"); //selects the booklist class where data will appended
let userSearch = ""; //userSearch input     
let term = ""; //user search input when the user is typing
let page ="";
let pageInput = document.querySelector("#form1"); 
let textInput = document.querySelector("#blank"); //selecting the input box to keep track of what the user is typing

pageInput.addEventListener("input",function(e){
    let page = e.target.value.split(" ").join("+").toLowerCase();
    getBooks(term,page);
});
textInput.addEventListener("input",function(e){   //main event listener, keeps track of what the user is typing
    term = e.target.value.split(" ").join("+").toLowerCase(); //logs what user is typing into term variable
    getBooks(term);  //sends the search result to the getBooks function to retrieve the data
});

async function getBooks(term,page){     //main axios function, returns books
    let url;
    if(page){
        url = (`${DOMAIN}${term}/${page}`);
    }else{
        url = (`${DOMAIN}${term}`);
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
            //let h3 = document.createElement("h3");
            let image = document.createElement("img");  //creating an image element to return images of the data
            
            //let p = document.createElement("p")

            //h3.innerHTML = book.title;
            image.setAttribute("src",book.image); //gives the src to the image to display the image
            //p.innerHTML = book.subtitle;

            bookList.append(image); //appends the image to the page so that it is visible
            // bookList.append(h3);
            // bookList.append(p);
        })
}