---
date: 2016-01-25 15:43:29+00:00
description: ""
header:
  image: 2016/01/25/rapping-reviews-logo.png
  max_width: 2346
  max_height: 1320
slug: /rapping-reviews-has-been-released
template: blog-post
title: Rapping.Reviews has been released!
tags:
  - algorithm
  - battle
  - computer-generated
  - hip-hop
  - IMDb
  - Jip de Beer
  - movie
  - rap
  - Rapping.Reviews
  - reviews
  - sentiment analysis
  - tv series
---

**Update 16th of November 2020:** Rapping.Reviews was shut down today. I've had lot's of fun with it over the years, but maintaining the project is no longer a priority for me.

It's almost 4 weeks since I released my Rapping.Reviews project. After about a year of hard work, [crazy rap auditions](../rap-karaoke-in-a-costume-minerva-open-day/) and a long search for affordable and performant managed WordPress hosting the website is finally live. Check out the trailer!

{% include video id="C8rjhIkAE9o" provider="youtube" %}

Rapping.Reviews automatically analyzes the reviews from Movies and TV Series and presents them in the form of a rap battle music video. Currently the site contains raps about more than 13.000 Movies and TV Series and automatically updates itself every day (provided that there are enough new IMDb reviews). You can read more about the concept on the [About Rapping.Reviews](#archived-about) page.

Some raps work well, some don’t - that’s part of the joke. Personally I liked the rap from ‘50 Shades of Grey’, it's quite a hefty battle! Especially the ending...

The last time I wrote about the project was in my [Rap Karaoke in a Costume @ Minerva Open Day](../rap-karaoke-in-a-costume-minerva-open-day/) blog post. The concept changed a little since then. During the Open Day @ Minerva I filmed people with the intention to have them appear as rappers on the website. I wanted them to express a positive or negative opinion while pretending to be rapping. I made recordings of 27 different rappers and thought I'd need even more recordings to finish off the website! But after trying to integrate the footage with the concept of Rapping.Reviews it turned out I already had everything I needed! The recordings of me in the Morphsuit worked great within the website because you can't see my mouth and they are neutral enough to not distract from the rap lyrics. The event during the open day helped me to quickly test out many different appearances for the rapper and see what would work best.

Since the release in January the site has already been visited by at least 3.500 unique users! Combined they viewed at least 3.800 rap battles. This is in the first three and a half weeks since the site is online... So I'm definitely very happy with these numbers. I don't think I've ever made something that has been viewed by so many people in such a short time :) The users are from all over the world, but most of them come from the US, followed by The Netherlands and the UK.

{% include figure image_path="2016/01/25/rapping-reviews-has-been-released_map.png" caption="" alt="" class="" max_width=1528 max_height=980%}

Rapping.Reviews has also made it into the top 3 of the month on [pointlesssites.com](http://pointlesssites.com)! Which is obviously a big honor. 58% of all the visitors from the past weeks come from pointlesssites.com.

<div>
{% include figure image_path="2016/01/25/pointlesssites.png" caption="" alt="" class="" max_width=366 max_height=240%}
</div>

# How Rapping.Reviews Works

This is brief write-up on how Rapping.Reviews technically works (sort of chronologically and very simplified).

I made a Node.js script that checks for new movie and TV series releases. One of the sources that provides this information is [TMDb](https://www.themoviedb.org). This list of new movies and TV series is combined with the movies and TV series that are already processed by Rapping.Reviews. Raps that have already been processed, may need to be updated because new reviews could have been written. An update will be attempted according to the following schedule:

     // update every week of released this month
     var updateEveryXWeeks = 1;

     if (weeksSinceRelease >= 104){
     // update every 52 weeks if released two years ago or longer
     updateEveryXWeeks = 52;
     } else if (weeksSinceRelease >= 52){
     // update every 26 weeks if released a year ago or longer
     updateEveryXWeeks = 26;
     } else if (weeksSinceRelease >= 26){
     // update every 4 weeks if released half a year ago or longer
     updateEveryXWeeks = 4;
     } else if (weeksSinceRelease >= 4){
     // update every 2 weeks if released a month ago or longer
     updateEveryXWeeks = 2;
     }

In addition to this check, there need to be 10% more reviews than last time. Otherwise it's not very interesting to make a new rap battle. So the program checks with IMDb how many reviews there are for the movie or TV series in question. If there are 10% more reviews, all reviews for the item will be requested from IMDb, as well as additional meta from TMDb (e.g. the YouTube trailers) and OMDb.

When downloading the data has completed, the data is passed to a Python script that will start generating the rap. The review text (and title) is split up in sentences using NLTK. The sentences are cleaned up a bit and very long sentences are removed (because they wouldn't flow well within the rap). The polarity (positive or negative) of the sentence is determined using the VADER Sentiment Python library, also taking into account the rating (1 to 10 stars).

The positive sentences are sorted from most positive to least positive and the negative ones from most negative to least negative. Sentences with the same 'positive or negative' score are sorted randomly (this will introduce more variation between updates of the raps). The next part is done separately for the positive and negative sentences. From the first (most positive or most negative) sentence, the last word (which should rhyme with another sentence) is taken. To figure out which words rhyme with this word, [Rhuthmos.py](https://github.com/hamilton/Rhymeless/blob/master/rhuthmos/rhuthmos.py) interfaces with the [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict). All rhyme words are returned. Now the script looks for at the other sentences to see which sentences end on the rhyming words. If a match if found, the match with the highest combined positive score (or negative score in case of negative sentences) is saved. This is repeated until enough matches are found or until there are no more sentences to process. If all went well the result is 6 pairs of rhyming positive sentences and 6 paris of rhyming negative sentences. The lyrics are now finished.

The data is posted to a WordPress website on which the rap battle HTML/JavaScript player is located. The rap battle player uses [Video.js](http://videojs.com) for the player UI, an embedded YouTube player in the background to play the movie trailer and [meSpeak.js](http://www.masswerk.at/mespeak/) to generate the WAV speech audio (which is all generated client side). All the WAV audio is combined into a single audio track which functions as the timeline to which other events (like showing the subtitles, switching the rapper) are synced. A beat is randomly chosen from a set of beats and the first 'beat drop' is synced to the moment the first rapper starts rapping. The reason the 'video' is generated client side is that I want to save on disk space usage and processing time to render 13.000 video's... which also need to updated from time to time. Another benefit is that when I add a new hip-hop beat, it can be used immediately by all reviews - without having to wait/render anything.

A mobile/tablet version is available too, which looks and sounds a bit differently. Mostly due to limitations that don't allow a YouTube video to play in the background. On iOS (and probably other systems too) it's not possible to play multiple video's at the same time either. So that's why the mobile player falls back to animated GIFs of the rapper and a picture slideshow in the background.

<p id="archived-about"></p>

**Update 16th of November 2020:** Since the site is no longer live, I've included the text from the about page here for future reference.

About
=====

With so many reviews on the web, there is only one sane thing to do... make rap battles out of them! Rapping.Reviews automatically analyzes the reviews from Movies and TV Series and presents them in the form of a rap battle music video. Curious what people say about a movie? Watch the rap battle! It's much more entertaining than reading reviews. However, IMDb reviews are often quite funny or interesting on themselves! That's why Rapping.Reviews provides the reviews with a stage of their own. Quotes from reviews get a chance to re-surface and make us curious, laugh or wonder. Otherwise, these sentences may become lost in the mass of reviews. Rapping.Reviews is all about re-cycling data that is already there to make something new.

Rapping.Reviews is fully automatic and operates without any human intervention. It is an experiment to see if one 'computer formula' can generate a continuous flow of new content that appeals to humans. The input (reviews written by users from the IMDb website) is automatically analyzed by Rapping.Reviews code. It attempts to separate positive and negative sentences and make rhyming pairs. The resulting rhyme is enriched with external data (e.g. images, a trailer video), a hip-hop beat and performed by a Text to Speech Synthesizer. The whole process isn't perfect, but there can be beauty in error too. Basically Rapping.Reviews is about coincidence and surprise, because nobody knows what will come out of it.

On the one hand, Rapping.Reviews stimulates reviewing Movies and TV Series. But on the other hand, it triggers discussion. Is making rap battles really the best thing to do with review data? What am I contributing to if I write a review? Who will read my review? Is it useless if nobody reads it? In this sense Rapping.Reviews is a parody on reviewing itself. Because let's face it, Rapping.Reviews isn't exactly very useful! There is just an overload of data. What are we supposed to do with it?

We're all contributing to the continuous increase of content. Even Rapping.Reviews is paradoxically creating more content, even though it tries to make opinions more accessible. (Un)consciously we're all generating and distributing data. But this data can be used for different things too... Rapping.Reviews demonstrates this by making rap battles from review text. The out of context citations may lead to unanticipated outcomes. This website doesn't have any bad intentions, it's a bit of a joke really. However, if other data you generate is misinterpreted, it could have negative impact. Beware of what you post online, your privacy, and what data you share.

History
-------

Rapping.Reviews has been conceptualized by Jip de Beer during the Text Mining course at the VU University in Amsterdam. Together with Maurits Bleeker, Martijn van der Burg, Jacco van Splunter and Koen van der Veen the first working prototype was presented at the VU Text Mining Hackathon March 2015. Jip continued to work on the project and released Rapping.Reviews in January of 2016.

{% include video id="JL8Z3l9F-pE" provider="youtube" %}

Credits
-------

#### Concept

Jip de Beer (with a wink to [Epic Rap Battles of History](http://www.epicrapbattlesofhistory.com/))

#### Development

Jip de Beer

#### Lyrics

Thanks to all IMDb users

#### Music

[Anno Domini](https://annodominination.com/)\
BrandNameAudio\
Broke For Free\
De FROiZ\
Digi GAlessio\
Ear2ThaBeat\
Epistra\
FREE Hip Hop Beats\
Future Beats\
Gunnar Olsen\
Harshalbeatbox\
KODAK Beatbox\
Kayleigh Beard\
Kingstruments\
LiVing Mo\
Life And Death\
MiMaMoo\
Navsta Beatbox\
Rampz\
Riot\
Scarebeatz\
Screwaholic\
Silent Partner\
Sinista Beats\
The Passion HiFi\
Tim Ross\
Vibe Tracks

#### Design

Jip de Beer\
20 Cents Marker Font by [Vincent Wicky-Demaria](http://www.reticula.fr/)\
[Source Sans Pro Font](https://github.com/adobe-fonts/source-sans-pro) by Adobe\
Webdesign based on premium WordPress theme: [VideoTube](http://themeforest.net/item/videotube-a-responsive-video-wordpress-theme/7214445)\
Photo '[Everyday Life](https://www.flickr.com/photos/29143375@N05/4381240666)' by Justin S. Campbell\
3D CSS effect adapted from [ThatGuySam](http://codepen.io/ThatGuySam/)

#### Technology

[VADER-Sentiment-Analysis](https://github.com/cjhutto/vaderSentiment) by C.J. Hutto\
[eSpeak](http://espeak.sourceforge.net/) text to speech\
[meSpeak.js](http://www.masswerk.at/mespeak/) by Norbert Landsteiner, mass:werk -- media environments\
Rhyming based on [Rhymeless](http://rhymeless.hamiltonulmer.com/) by Hamilton Ulmer\
[CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) by Carnegie Mellon University\
[php-tmdb](https://github.com/php-tmdb/) by Michael Roterman\
[video.js](http://videojs.com/) by Brightcove, Inc.\
[VideoJS Cuepoints](https://github.com/cladera/videojs-cuepoints) plugin by Carlos Galan Cladera\
[howler.js](https://github.com/goldfire/howler.js/) by James Simpson and GoldFire Studios, Inc.\
[Kenburns.js](https://github.com/renet/kenburns) by René Schubert\
[jQuery tubular](http://www.seanmccambridge.com/tubular/) by Sean McCambridge\
[jQuery Boxfit](https://michikono.github.io/boxfit/) by Michi Kono\
[jQuery Timeago](http://timeago.yarp.com/) by Ryan McGeary\
[Transit](http://ricostacruz.com/jquery.transit/) by Rico Sta. Cruz\
[store.js](https://github.com/marcuswestin/store.js/) by Marcus Westin\
[Bootstrap](http://getbootstrap.com/) by Twitter, Inc.\
[NLTK](http://www.nltk.org/)\
[WordPress](http://wordpress.org/)\
[Python](https://www.python.org/)\
[PHP](http://php.net/)\
[Node.js](http://nodejs.org/)\
[jQuery](http://jquery.com/)

#### Rap performance

Jip de Beer

#### Content providers

[IMDb](http://imdb.com/)\
[TMDb](https://www.themoviedb.org/)\
[OMDb](http://omdbapi.com/)\
[YouTube](https://www.youtube.com/)

#### Special thanks to

Kayleigh Beard\
Ko de Beer\
Sam Beard

The list of credits may not be complete. Please contact me if I forgot to add you to the list!

Disclaimer
----------

Rapping.Reviews uses publicly available data from the Internet, updates autonomously and is not curated by humans. The entire process from gathering data and generating rap lyrics, to publishing a rap battle music video is automated and without human intervention. Therefore the website may contain among other things spoilers, coarse language or graphic content. Viewer discretion is advised.

Rapping.Reviews is not trying to decrease the value of the reviewed material, nor of the reviews itself. The rap battles aim to comment on the reviewed material in a nuanced way with real human opinions. The interpretation is left to the observer. The used video trailers are already publicly available, as well as the used images. The video trailer and images are necessary to clarify the relation between the quotes and the review topic. Rapping.Reviews quotes from IMDb reviews, which is allowed according to fair use and right to quote. Credit is given to the review authors as well as to IMDb. Rapping.Reviews tries to poke fun at and comment on reviewing Movies and TV Series on the IMDb website. Hence, this website can be seen as a parody. The website doesn't just contain a collection of quotes, but the rap battles are new transformative works on their own.

