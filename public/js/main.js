let html = "";
let arr = [];
arr.forEach((element,index)=>{
    html += `
    <div class="col">
      <div class="card h-100">
        <img src="" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
    </div>`;
});
let booksEle = document.getElementById('books');
    if (arr.length != 0) {
        booksEle.innerHTML = html;
    }