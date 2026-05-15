var post = document.getElementById('title');
var social = document.getElementById('media');
var today = document.getElementById('day');
var btn = document.getElementById('btn1');
var display = document.getElementById('result');
var clear = document.getElementById('btn2');
var filter = document.getElementById('platform');


var posts = JSON.parse(localStorage.getItem("posts")) || [];


function saveData() {
    localStorage.setItem("posts", JSON.stringify(posts));
}


function renderPosts() {
    display.innerHTML = "";

    var selected = filter.value;
    var visibleCount = 0;

    posts.forEach(function (item, index) {

        if (selected !== "All" && item.platform !== selected) return;

        visibleCount++;

        var row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.platform} ${item.date}</td>
            <td><button id="btn3"  onclick="deletePost(${index})">delete</button></td>
        `;

        display.appendChild(row);
    });

    
    if (visibleCount === 0) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="3" style="text-align:center; padding:10px;">
                          No scheduled post yet
            </td>
        `;
        display.appendChild(row);
    }
}


btn.addEventListener('click', function () {

    if (post.value.trim() === "" || today.value === "") {
        alert('All fields are required');
        return;
    }

    posts.push({
        title: post.value,
        platform: social.value,
        date: today.value
    });

    saveData();
    renderPosts();


    post.value = "";
    today.value = "";
});


function deletePost(index) {
    posts.splice(index, 1);
    saveData();
    renderPosts();
}


clear.addEventListener('click', function () {
    posts = [];
    saveData();
    renderPosts();
});


filter.addEventListener('change', function () {
    renderPosts();
});

var quotes = [
    "Be yourself; everyone else is already taken. — Oscar Wilde",
    "Stay hungry, stay foolish. — Steve Jobs",
    "Do what you can, with what you have. — Theodore Roosevelt",
    "Success is not final, failure is not fatal. — Winston Churchill",
    "Believe you can and you're halfway there. — Theodore Roosevelt"
];

var quoteel = document.getElementById('quote');

function changeQuote() {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    quoteel.textContent = quotes[randomIndex];
}


changeQuote();



renderPosts();