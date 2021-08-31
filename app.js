const DOMAIN = 'https://api.itbook.store/1.0/search/';

let bookList = document.querySelector(".book-list");
let userSearch = "";
let term = "";
let textInput = document.querySelector("#blank");

textInput.addEventListener("input",function(e){
    let term = e.target.value.split(" ").join("+").toLowerCase();
    getBooks(term);
});

async function getBooks(term){
    try{
        let theBooks = await axios.get(`${DOMAIN}${term}`);
        data = theBooks.data.books;
        console.log(data);
        renderBooks(data);
    }catch(error){
        console.log(error);
    }
}

function renderBooks(data){
    bookList.innerHTML = ""
        data.forEach((book) => {
            //let h3 = document.createElement("h3");
            let image = document.createElement("img");
            
            //let p = document.createElement("p")

            //h3.innerHTML = book.title;
            image.setAttribute("src",book.image);
            //p.innerHTML = book.subtitle;

            bookList.append(image);
            // bookList.append(h3);
            // bookList.append(p);
        })
}