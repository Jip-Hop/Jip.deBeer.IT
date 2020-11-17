---
date: 2015-10-03 11:27:51+00:00
description: ""
header:
  teaser:
slug: /batch-download-tracks-from-youtube-music-library
template: blog-post
title: Batch Download Tracks from YouTube Music Library
tags:
  - JavaScript
  - Music
  - Vimeo
  - YouTube
---

The [YouTube Music Library](https://www.youtube.com/audiolibrary/music) is a good resource of free music. But when quickly trying to find a suitable track, I was slightly annoyed that the YouTube Music Library doesn't allow you to scrub through the track. This forces me to listen to the whole intro. I wrote a small script that batch downloads all track on the current page. This way you can easily listen to the tracks in your favorite media player and scrub as much as you like :)

{% capture _code %}{% highlight javascript linenos %}
// Anonymous "self-invoking" function
(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

    // Poll for jQuery to come into existance
    var checkReady = function(callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 100);
        }
    };

    // Start polling...
    checkReady(function($) {
        // Start download

        $('.download-link').each(function(){
            $this = $(this);
            $this.prop("download", "");
            this.click();
        });
    });
})();
{% endhighlight %}{% endcapture %}{% include fixlinenos.html %}{{ _code }}

Run this code in the JavaScript console (Command+Option+J on the Mac in Google Chrome) when in the YouTube Music Library.

Resources used: [Stackoverflow.com](http://stackoverflow.com/questions/10113366/load-jquery-with-javascript-and-use-jquery)

Update:
The same method works on the Vimeo Music Library too (where you're also unable to scrub through songs). You only need to change the class selector from .download-link to .download. Vimeo doesn't show all tracks on one page so you may need to run it a few times.