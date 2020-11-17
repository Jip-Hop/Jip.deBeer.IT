---
date: 2016-01-26 15:41:42+00:00
description: ""
header:
  image: 2016/01/26/random-vegan-comic.png
  max_width: 2879
  max_height: 1619
slug: /random-vegan-comic-google-chrome-extension
template: blog-post
title: Random Vegan Comic - Google Chrome Extension
tags:
  - add on
  - extension
  - google chrome
  - plug-in
  - vegan
---

I wasn't incredibly happy with how my previous [Google Chrome extension](../brainwash-yourself-google-chrome-extension/) turned out, so on the same day I made [Random Vegan Comic](https://chrome.google.com/webstore/detail/random-vegan-comic/gmdoilbppphjcbndphaplgfakkmgiaog).

{% comment %} <!-- https://www.benmarshall.me/responsive-iframes/ --> {% endcomment %}

<style>
  [style*="--aspect-ratio"] > :first-child {
  width: 100%;
} 
@supports (--custom:property) {
  [style*="--aspect-ratio"] {
    position: relative;
  }
  [style*="--aspect-ratio"]::before {
    content: "";
    display: block;
    padding-bottom: calc(100% / (var(--aspect-ratio)));
  }  
  [style*="--aspect-ratio"] > :first-child {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }  
}
</style>
<p style="--aspect-ratio: 1/1;"><iframe src="https://srv.debeer.it/random_vegan_image_demo/" width="400" height="400" scrolling="no" frameborder="0"></iframe></p>

With the plugin installed a random comic made by [Vegan Sidekick](http://vegansidekick.com) will be added to about 20% of the pages you visit. It's inserted right after the longest paragraph on the page, and only if the page contains a long paragraph of text. So it fits quite naturally within each page :)

I've recently decided to become vegan after many years of being a vegetarian. When I found the comics by Vegan Sidekick on Facebook, I immediately liked them! I think they're very recognizable and funny. However I think it would be nice to give them more exposure and get them out of the social media context.

Facebook is the only social network I'm actively using at the moment, and most of the time I'm viewing it on my phone. The vegan sidekick images often have text that's too small to read on the 4" screen of my phone. And even though I probably spend a considerable time scrolling through the Facebook timeline... I spend even more time browsing websites. The Random Vegan Comic plugin takes the comics outside of the Social Media environment and puts them in any website, as if they belong to the content of the page. This often confuses and surprises users, even me!
