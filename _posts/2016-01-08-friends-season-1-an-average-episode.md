---
date: 2016-01-08 15:59:12+00:00
description: ""
header:
  image: 2016/01/08/1261.jpg
  max_width: 1280
  max_height: 720
slug: /friends-season-1-an-average-episode
template: blog-post
title: Friends Season 1 - An Average Episode
tags:
  - audio
  - average
  - friends
  - MADtech
  - median
  - Minerva
  - python
  - Video
---

I recently read an article about [average faces](http://www.engadget.com/2015/11/16/face-detection-tech-inanimate-objects-human/) which made me curious about moving average images. How would an average movie of a certain director look like? Or what would the average 'I love you' phrase in a movie look AND sound like? While I was thinking about this, somebody told me this has already been done with the first season of the Friends TV Series. So I looked up the YouTube video "Watch Every Episode of Friends Simultaneously". **Update 20th of November 2020**: the original video is no longer available.

My initial reaction was: "Ah, so this is what an average piece of video looks like". But when I looked closer and read comments about how it was made, it became clear to me that this video doesn't show the average frames! It has been made with a video editing program, by layering all the 24 episodes on top of each other and adjusting the transparency of each layer. This way you can see through the higher layers. But as a result of this method, layers that are on top are more visible than the bottom layers! So I decided to make an experiment and compare the average Season 1 to the video already on YouTube. (Note: I'm not criticizing the uploader of the original YouTube video, as he never said it would show average frames)

Video editing programs like Adobe Premiere Pro or After Effects can't (as far as I know) generate average frames from several input video's. So I had to write a program myself. First I exported all frames from the separate episodes using ffmpeg. Then I used Python with Numpy and PIL to average each frame. For the audio, I had to do something similar. I exported all audio tracks to WAV files averaged them together using a second script. Finally I combined the new average audio track with the exported average image sequence. This is the result:

{% include video id="mU66u9tMOys" provider="youtube" %}

So, the difference is quite apparent. The average frames look much smoother since they are really blended together. Unfortunately due to the YouTube compression much of the smoothness is lost. Here are a few output still frames:

{% include figure image_path="2016/01/08/1261.jpg" caption="" alt="" class="" max_width=1280 max_height=720%}
{% include figure image_path="2016/01/08/16478.jpg" caption="" alt="" class="" max_width=1280 max_height=720%}
{% include figure image_path="2016/01/08/24421.jpg" caption="" alt="" class="" max_width=1280 max_height=720%}

The sound, actually sounds very similar. Average sound apparently sounds as if all sounds are playing simultaneously. I must add however, that due to averaging the audio tracks the total volume goes down a lot. It's simple math: an average number can never be higher than any of the numbers you are averaging over. Since sound in TV Series isn't at max volume all the time (there are also quiet parts) the average audio volume will be lower. I cheated a bit here and normalized the audio afterwards so it becomes easier to hear and you don't need to turn your speakers/headphones to max volume (and blow off your ears later if you forget to lower the volume after)! The more tracks you average the lower the volume is likely to become.

The thing with average frames is that you're looking at a mix, but most of the pixels aren't actually present in the original frames... it's something new. After reading about [100 Special Moments by Jason Salavon](http://www.cabinetmagazine.org/issues/15/salavon.php) I wanted to try out the median too. The median is a different metric that takes the middle value from a list of ordered values. So (almost) every pixel value in the median output is also in one of the input frames. The same with audio. Every timestep one audio sample is picked from the 24 audio tracks. So the Median Friends Season 1 Episode is composed of tiny samples from all 24 episodes that are the most 'neutral' representation at that time.

{% include video id="W7AdEige_NU" provider="youtube" %}

This looks and sounds a lot different than the average episode! Much more contrasty and vibrant.

{% include figure image_path="2016/01/08/1261-1.jpg" caption="" alt="" class="" max_width=1280 max_height=720%}
{% include figure image_path="2016/01/08/16478-1.jpg" caption="" alt="" class="" max_width=1280 max_height=720%}
{% include figure image_path="2016/01/08/24421-1.jpg" caption="" alt="" class="" max_width=1280 max_height=720%}

Again I normalized the audio afterwards. To me it sounds a bit like a broken radio!

This is the code used:
<script src="https://gist.github.com/Jip-Hop/112ef3a24eaa4d87767a.js"></script>
<script src="https://gist.github.com/Jip-Hop/c69c10da6f5376502b51.js"></script>
<script src="https://gist.github.com/Jip-Hop/c70319c0e0eb5bae0bc7.js"></script>