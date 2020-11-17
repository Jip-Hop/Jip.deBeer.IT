---
date: 2014-11-16 11:59:55+00:00
description: ""
header:
  image: 2014/11/16/The-Beacon-Presentation.012-header.jpg
  max_width: 1024
  max_height: 640
slug: /product-development-the-beacon
template: blog-post
title: Product Development - The Beacon
post_format:
  - Gallery
tags:
  - Adafruit
  - ADM
  - Android
  - Beacon
  - Firebase
  - Interactive Devices
  - Kayleigh Beard
  - Lamp
  - LED
  - LPD8806
  - Node.js
  - NTU
  - PI JS
  - Raspberry Pi
  - Smartphone
  - Tasker
  - Vladimir Todorovic
---

My favorite course at ADM was Interactive Devices where we developed lamps that visualize information about a person. 

{% include video id="6j1AD8AJigk" provider="youtube" %}

As you can hear in the video above, my concept is like this:

# The Beacon - A smart lamp for lovers

> Do you like to feel connected to the people you care about? We do! That's why we've developed The Beacon: a lamp to feel connected when your partner is away from home.
>
> When at least one person is home The Beacon gently lights up when the other turns on the screen of their phone. A signal of life that makes you feel the presence. That way you can feel connected without effort. You can also shake the phone to signal your partner a light message. This means: contact me! It obviously works the other way around too. The Beacon knows exactly who is home.
>
> Coming home will not be the same without it! The Beacon enhances the warm feeling of reuniting with a loved one by creating a pleasant light scape.
>
> That's what The Beacon is all about: staying connected when separated and enhancing being together.

To develop the lamp, I used a Raspberry Pi model A together with a [LPD8806 LEDstrip. ](https://www.adafruit.com/products/306)I learned how to properly connect everything from the [Adafruit tutorial](https://learn.adafruit.com/raspberry-pi-spectrum-analyzer-display-on-rgb-led-strip/led-strip-and-rgb-led-software) but in the end decided to use Node.js for controlling the LEDstrip.

Because I had to have a real-time connection between a smartphone and the Raspberry Pi I opted for Firebase (which I already knew from previous experiments) which tied in with Node.js effortlessly! To program on the Raspberry Pi in Node.js I used [PI JS](http://pijs.io/), a really useful tool that allows programming in a browser window and automatically updates and executes the code on the Pi! Whenever I turned on the screen on my Android phone, [Tasker](http://tasker.dinglisch.net/) sends a message to my Firebase account (with the help of the [RESTask for Tasker](https://play.google.com/store/apps/details?id=com.freehaha.restask)). The Raspberry Pi immediately receives the data from Firebase and reacts with the light animations I've programmed in Node.js.

In the gallery below you can see the process of creating the lamp.

{% include figure image_path="2014/11/16/The-Beacon-Presentation.001.jpg" caption="The title screen of the video" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.002.jpg" caption="Setting up WiFi on the Raspberry Pi. Without a HDMI monitor available I had to use a projector…" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.003.jpg" caption="Kayleigh is Happy. Finally the parts we ordered were delivered! We could start working :)" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.004.jpg" caption="Setting up the connection for the LED strip" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.005.jpg" caption="I was inspired by the memory of paper bag candle lanterns" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.006.jpg" caption="LEDstrip in a paper bag: testing the diffused light." alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.007.jpg" caption="Lunch with Albin: an important part of the process." alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.008.jpg" caption="Prototyping with whatever materials I could find" alt="" class="" max_width=574 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.010.jpg" caption="Making a custom structure" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.011.jpg" caption="With the Raspberry Pi" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.013.jpg" caption="Another prototype" alt="" class="" max_width=572 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.014.jpg" caption="Gluing cups together" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.015.jpg" caption="Made from a few cups" alt="" class="" max_width=570 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.016.jpg" caption="A fully functional prototype" alt="" class="" max_width=572 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.017.jpg" caption="The end result wasn’t very nice. Vladimir thought it looked like a milk bottle. Needed to start over with the shape." alt="" class="" max_width=569 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.019.jpg" caption="Inspired by the spirals found on lighthouses" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.020.jpg" caption="Side without paper" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.021.jpg" caption="Albin’s lamp on top of mine! Vladimir wasn’t impressed by our collaboration." alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.022.jpg" caption="Experimenting with light effects" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.023.jpg" caption="Back to the drawing board: carefully drawing the spiral pattern" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.024.jpg" caption="Designing a template" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.025.jpg" caption="If only the LED lights weren’t that visible…" alt="" class="" max_width=572 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.026.jpg" caption="Soldering the LEDstrip parts together" alt="" class="" max_width=572 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.027.jpg" caption="Fixated with double sided tape" alt="" class="" max_width=1024 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.028.jpg" caption="The final shape. The LED lights are now aligned with the spiral. Nice!" alt="" class="" max_width=570 max_height=768%}
{% include figure image_path="2014/11/16/The-Beacon-Presentation.029.jpg" caption="Jip filming at home. That’s how I film… xD" alt="" class="" max_width=1024 max_height=768%}
