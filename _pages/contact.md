---
permalink: /contact/
header:
  image: 2020/11/13/jip.jpg
  max_width: 1024
  max_height: 576
---

Contact me by email: <a id="mail" href="mailto:spam@debeer.it?body=Please%20send%20your%20message%20to%20%22my%20first%20name%22%20%40debeer.it.%20Emails%20sent%20to%20spam%40debeer.it%20won%27t%20be%20read.">my first name AT deBeer.IT</a>.

# About Jip

<p style="hyphens: none;">As an artist I operate on the intersection of art and computer science. Fascinated by automation, I write code to optimize my artistic work(flow). It involves web browsers, takes a visual approach and it's generative or interactive. My home is the city of Groningen in the north of The Netherlands, I'm 100% vegan and contribute to open source projects on <a href="https://github.com/Jip-Hop/" rel="noopener noreferrer">GitHub</a>.</p>

<script>(function () {
const a = document.getElementById("mail");
var timer;

function fixMail(e){
  a.innerText = "Jip@" + a.innerText.split(" ").pop();
  a.href = "mail" + "to:" + a.innerText;
  a.removeEventListener("click", fixMail);  
  if(e){
    e.preventDefault();
    clearTimeout(timer);
    window.location.href = a.href;
  }  
}

a.addEventListener("click", fixMail);
timer = setTimeout(fixMail, 3000);
})();</script>

