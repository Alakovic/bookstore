function render() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = '';

    for (let i = 0; i <books.length; i++) {
       contentRef.innerHTML += getBooks(i);
       showComments(i);
    }
}


function getBooks(i) {
    return ` <div class="box" > <div class="book_title">
                               <div class="book_img"><img src="./img/book.png" alt="book.png"> </div>
                               <h1> ${books[i].name}</h1></div>  <hr>
                                <div class="price_likes">
                               <div class="price">
                                <span>${books[i].price}&euro;</span> </div>
                                <div class="likes">
                                <p>${books[i].likes} </p>
                                 ${likedOrNotLiked(i)}
                               </div>
                               </div>
                               <div class="book_info">
                                  <table>
                                        <tr>
                                            <td>Author:</td>
                                            <td>${books[i].author}</td>
                                        </tr>
                                        <tr>
                                            <td>Erscheinungsjahr:</td>
                                            <td>${books[i].publishedYear}</td>
                                        </tr>
                                        <tr>
                                            <td>Genre:</td>
                                            <td>${books[i].genre}</td>
                                        </tr>
                                    </table> 
                               </div><hr>
                         <h3>Kommentare:</h3>
                         <div class="comment_section">
                         <table class="comments" id="commentsTable-${i}">
                            <tbody>
                            </tbody>
                        </table>
                        </div>
                       <div class="input_submit">
                        <input type="text" id="commenterName-${i}" placeholder="Your name" class="input_name" required>
                        <textarea id="commentText-${i}" placeholder="Your comment" class="input_comment" required></textarea>
                        <img src="img/papierflieger.png" alt="Submit" class="submit_icon" onclick="addComment(${i})">

                       </div>             
            </div>`
}



function likedOrNotLiked (i) {
    if (books[i].liked === true) {
      return `  <img class="heart_img" src="./img/like.png" alt="" onclick="toggleLike(${i})"></img> `
    } else {
        return ` <img  class="heart_img" src="./img/unlike.png" alt="" onclick="toggleLike(${i})"></img>  `
    }
}

function toggleLike(i) {
    books[i].liked = !books[i].liked;
    books[i].liked ? books[i].likes++ : books[i].likes--;
    render();
}




function showComments (i){
    let commentsTableBody = document.querySelector(`#commentsTable-${i} tbody`);
    
    if (!commentsTableBody) {
        console.error(`Table with ID 'commentsTable-${i}' not found.`);
        return;
    }

    commentsTableBody.innerHTML = '';

    books[i].comments.forEach(comment => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = comment.name + ":";
        nameCell.classList.add('commenter_name');

        const commentCell = document.createElement('td');
        commentCell.textContent = comment.comment;
        commentCell.classList.add('comment_text'); 

        row.appendChild(nameCell);
        row.appendChild(commentCell);
        commentsTableBody.appendChild(row);
    });
}

function addComment(i) {
    const commenterName = document.getElementById(`commenterName-${i}`).value;
    const commentText = document.getElementById(`commentText-${i}`).value;

    if (commenterName && commentText) {
        
        books[i].comments.push({
            name: commenterName,
            comment: commentText
        });

        document.getElementById(`commenterName-${i}`).value = '';
        document.getElementById(`commentText-${i}`).value = '';

        showComments(i);
    } else {
        alert('Please fill in both fields!');
    }
}

