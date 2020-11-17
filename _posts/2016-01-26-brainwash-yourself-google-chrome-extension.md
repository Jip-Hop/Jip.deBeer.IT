---
date: 2016-01-26 10:47:49+00:00
description: ""
header:
  image: 2016/01/26/brainwash-yourself-google-chrome-extension.png
  max_width: 1280
  max_height: 800
slug: /brainwash-yourself-google-chrome-extension
template: blog-post
title: Brainwash Yourself - Google Chrome Extension
tags:
  - add on
  - extension
  - google chrome
  - plug-in
  - subliminal message
---

Have you ever heard that story about subconscious Coca Cola advertising in the cinema? Well, if you haven't here's a bit of text quoted from [Businessinsider.com](http://www.businessinsider.com/subliminal-ads-2011-5):

<blockquote>The birth of subliminal advertising as we know it dates to 1957 when a market researcher named James Vicary inserted the words "Eat Popcorn" and "Drink Coca-Cola" into a movie.

The words appeared for a single frame, allegedly long enough for the subconscious to pick up, but too short for the viewer to be aware of it. The subliminal ads supposedly created an 18.1% increase in Coke sales and a 57.8% increase in popcorn sales.

Vicary's results turned out to be a hoax. But more recent experiments have shown that subliminal messages actually can affect behavior in small ways.</blockquote>

Inspired by this story, I wanted to experiment with the concept of subconscious messages inside an internet browser. Instead of companies and other external parties trying to influence you, wouldn't it be nice if you could influence yourself with something you choose?

_Brainwash Yourself_ is my first attempt at making a Google Chrome browser extension. It allows you to choose one or more images that will be shown for only a fraction of a second during browsing. If you want to be happier, you could choose an image that makes you happy. Or if you want to be reminded that you need to drink enough water, you could choose images of water bottles, waterfalls, whatever makes you thirsty. Or motivate yourself to work-out more or think of your friends or family. The default image is a sunflower.

{% include figure image_path="2016/01/26/sunflower.jpg" caption="Brainwash Yourself Default Image - Sunflower" alt="" class="" max_width=2048 max_height=1365%}

Currently the image flashes every 10 seconds, which may be a bit too often. Why? Well... according to the story the single advertising frame was visible too short for the viewer to be aware of it. Maybe too short to be fully aware of what is shown in the frame, but it's quite obvious that something is flashing! Especially when browsing on the web, where pages are usually static with a light background and a lot of text, it's distracting when an image is suddenly flashed all over the screen. Even if it's just for the duration of a single frame.

The plugin uses window.requestAnimationFrame() to show the image as short as possible. But it still makes me blink every time the image is shown. So this approach is not very successful at influencing yourself subliminally - but you can still try to influence yourself with it!

The code is on [GitHub](https://github.com/Jip-Hop/Brainwash-Yourself). To install it in Google Chrome you need to go to download the code from GitHub. Then go to chrome://extensions/, turn on developer mode, load unpacked extension, choose the '[brainwash_yourself](https://github.com/Jip-Hop/Brainwash-Yourself/tree/master/brainwash_yourself)' folder. You can choose images via the plugin settings. Toggling the plugin on or off is supposed to work by clicking on the plugin icon, but that's not really working. So you should turn off the plugin in chrome://extensions/.
