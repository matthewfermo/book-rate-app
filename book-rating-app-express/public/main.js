console.log("test");
var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");
var edit = document.getElementsByClassName("fa-pencil");

Array.from(thumbUp).forEach(function (element) {
  element.addEventListener("click", function () {
    const author = this.parentNode.parentNode.childNodes[1].innerText;
    const title = this.parentNode.parentNode.childNodes[3].value;
    const thumbUp = parseFloat(
      this.parentNode.parentNode.childNodes[5].innerText
    );
    fetch("messages", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: author,
        title: title,
        thumbUp: thumbUp,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(thumbDown).forEach(function (element) {
  element.addEventListener("click", function () {
    const author = this.parentNode.parentNode.childNodes[1].innerText;
    const title = this.parentNode.parentNode.childNodes[3].value;
    const thumbUp = parseFloat(
      this.parentNode.parentNode.childNodes[5].innerText
    );
    console.log(thumbUp);
    fetch("messages/thumbDown", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: author,
        title: title,
        thumbUp: thumbUp,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const author = this.parentNode.parentNode.childNodes[1].innerText;
    const title = this.parentNode.parentNode.childNodes[3].value;
    console.log(this.dataset.id);
    console.log(title, author);
    fetch("messages", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.dataset.id,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
Array.from(edit).forEach(function (element) {
  element.addEventListener("click", function () {
    const author = this.parentNode.parentNode.childNodes[1].innerText;
    const title = this.parentNode.parentNode.childNodes[3].value;
    console.log(this.dataset.id);
    console.log(title, author);
    fetch("messages/edit", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.dataset.id,
        title,
        author,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
