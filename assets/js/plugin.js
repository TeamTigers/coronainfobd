/*================================================================================
  Item Name: Materialize - Material Design Admin Template
  Version: 2.1
  Author: GeeksLabs
  Author URL: http://www.themeforest.net/user/geekslabs
================================================================================*/

$(document).ready(function() {
  $(".tooltipped").tooltip();
  $(".sidenav").sidenav();
  $(".modal").modal();
  $(".dropdown-trigger").dropdown();
  $(".tabs").tabs();
  $('.slider').slider();
});
//   // Fullscreen
//   function toggleFullScreen() {
//     if ((document.fullScreenElement && document.fullScreenElement !== null) ||
//       (!document.mozFullScreen && !document.webkitIsFullScreen)) {
//       if (document.documentElement.requestFullScreen) {
//         document.documentElement.requestFullScreen();
//       }
//       else if (document.documentElement.mozRequestFullScreen) {
//         document.documentElement.mozRequestFullScreen();
//       }
//       else if (document.documentElement.webkitRequestFullScreen) {
//         document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
//       }
//     }
//     else {
//       if (document.cancelFullScreen) {
//         document.cancelFullScreen();
//       }
//       else if (document.mozCancelFullScreen) {
//         document.mozCancelFullScreen();
//       }
//       else if (document.webkitCancelFullScreen) {
//         document.webkitCancelFullScreen();
//       }
//     }
//   }

//   $('.toggle-fullscreen').click(function() {
//     toggleFullScreen();
//   });
