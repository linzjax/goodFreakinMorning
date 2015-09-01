var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    console.log(xhr.responseText());
};

xhr.open('GET', 'https://api.trello.com/1/board/4d5ea62fd76aa1136000000c?key=2b974e8471167b9d3fd6c58c1d715834', true);
