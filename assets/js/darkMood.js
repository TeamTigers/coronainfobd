// self called function

(function init() {
  if (localStorage.getItem("darkMood")) {
    document.querySelector("html").classList.toggle("dark");
    document.getElementById("moodIcon").innerHTML = "brightness_3";
    $("#mindmap").attr("src", 'https://teamtigers.github.io/coronainfobd/assets/img/CoronaInfoDark.webp');
  } else {
    $("#mindmap").attr("src", 'https://teamtigers.github.io/coronainfobd/assets/img/CoronaInfo.webp');
  }
})();

function darkMood() {
  var tempArr = document.querySelector("html").classList;
  document.querySelector("html").classList.toggle("dark");

  if (Object.values(tempArr).includes("dark")) {
    localStorage.setItem("darkMood", "1");
    document.getElementById("moodIcon").innerHTML = "brightness_3";
  } else {
    localStorage.removeItem("darkMood");
    document.getElementById("moodIcon").innerHTML = "brightness_7";
  }
}
