---
permalink: /reisma/
title: 'Screen Breach Presentation'
header:
  image: 2020/10/11/stream_of_trials_-_jip_de_beer_IMG_9589.jpg
  max_width: 3840
  max_height: 2400
---

The Reisma van den Burg grant final presentation will take place on Saturday the 23rd of January from 21:00 until 23:00 (timezone Amsterdam). It will be hosted as a live stream on this page.

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
if(document.fullscreenEnabled){
  var button = document.getElementById("fullscreen-button");
  button.style.display = "block";
  button.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.getElementById("twitch-embed").requestFullscreen();
      }
    },
    false
  );
}
</script>