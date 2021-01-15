---
permalink: /reisma/
title: 'Screen Breach Presentation'
header:
  image: 2020/10/11/stream_of_trials_-_jip_de_beer_screen_breach_baltan_test.jpg
  max_width: 3840
  max_height: 2400
---

The Reisma van den Burg grant final presentation will take place on **Saturday the 23rd of January from 21:00 until 23:00** (timezone Amsterdam). It will be hosted as a live stream at the bottom of this page.

Since the Reisma van den Burg stipend was awarded, New Media Artist Jip de Beer and international artist collective [Videokaffe](http://www.videokaffe.com) have been exploring the Screen Breach concept: an artistic form of telepresence. Screen Breach is a hybrid collaboration / presentation format in which different locations (gallery, studio, academy, etc.) are linked together via the internet by means of projectors, webcams, sensors and motors.

Together the artists make drawings or kinetic sculptures. These works are partly virtual, partly physical and influence each other in real time. The highlight of their collaboration (so far) was during the [Stream of Trials](../stream-of-trials/) residency of 2 months at SIGN, during which Screen Breach portals were opened between New York, Eindhoven, Chicago and Turku.

Especially for the Screen Breach sessions, Jip developed the open source tools [Mappertje](https://mappertje.debeer.it) and [Pop-out Jitsi Meet](https://jitsipop.tk/), which are now used by thousands of people. And not just for artmaking, since telepresence and video conferencing have gained popularity during the pandemic. 

With an intensive six-day course Jip shared the knowledge he acquired with MADtech students of the Frank Mohr Institute. The results will be presented in the live stream below on the 23rd of January from 21:00 until 23:00 (timezone Amsterdam).

<div id="twitch-embed" class="responsive-video-container" style="height:calc(100vh - 48px);"></div>
<script src="https://embed.twitch.tv/embed/v1.js"></script>
<script type="text/javascript">
  new Twitch.Embed("twitch-embed", {
    width: "100%",
    height: "100%",
    channel: "jipdebeer"
  });
</script>

<a id="fullscreen-button" class="pagination--pager" href="#" style="display:none;background-color:transparent;padding-left:0;padding-right:0;width:100%; margin-bottom:1em;">Open Stream & Chat in Full Screen</a>
<script>
if(document.fullscreenEnabled || document.webkitFullscreenEnabled){
  var button = document.getElementById("fullscreen-button");
  var twitch = document.querySelector("#twitch-embed iframe");
  button.style.display = "block";
  button.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.webkitFullscreenElement){
        document.webkitExitFullscreen();
      } else if (twitch.requestFullscreen){
        twitch.requestFullscreen();
      } else if (twitch.webkitRequestFullscreen){
        twitch.webkitRequestFullscreen();
      }
    },
    false
  );
}
</script>