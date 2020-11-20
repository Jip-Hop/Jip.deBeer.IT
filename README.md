## Minimal Mistakes remote theme

Made with the [Minimal Mistakes remote theme starter ](https://github.com/mmistakes/mm-github-pages-starter/generate). I'll be using my own forked version of Minimal Mistakes as a remote theme so I have a copy in case the Minimal Mistakes repo goes away. 

## Update

Check if my site still works well with the newest version of [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes/) by changing remote_theme: Jip-Hop/minimal-mistakes to remote_theme: mmistakes/minimal-mistakes inside _config.yml. I there are no problems I can update my fork (Jip-Hop/minimal-mistakes), change back the remote_theme and push the changes to GitHub pages.

## Overrides

Files in this repo will override the theme files in Minimal Mistakes. Changes I've made:

- Show random posts indead of related posts. Related posts weren't actually related (just showed 4 most recent posts all the time) and MM doesn't have a good alternative either: https://github.com/mmistakes/minimal-mistakes/pull/978. (_layouts/single.html)
- Show browser warning on IE (also IE10 and IE11) with User Agent sniffing. (browser-upgrade.html and via JavaScript in /_includes/footer/custom.html)
- Fall back to other images specified in post front matter, when no teaser image is specified (archive-single.html)
- Enable HTML compression (_layouts/default.html): https://github.com/mmistakes/minimal-mistakes/issues/1324 This seems to break syntax highlighting when used with linenos option: `{% highlight javascript linenos %}`. So just use triple backticks around code blocks if no need for line numbers. Otherwise fix [like this](https://github.com/penibelst/jekyll-compress-html/issues/71#issuecomment-188144901).
- Custom front page with featured posts (index.html)
- Removed JS libraries (gumshoe, jquery.fitvids.js, jquery.greedy-navigation, jquery.magnific-popup, smoothscroll) and dependencies (jQuery). Some functionality is reduced, like no automatic handling of too many items in the nav bar on small screens (greedy-navigation). I don't have a lot of links in the nav bar anyway, but if I need it maybe https://github.com/gijsroge/priority-navigation is a good alternative.
- Alternative (defer) loading of JavaScript and libraries from the head as setup via head_scripts: in the _config.yml file. Modified /_includes/scripts.html to not also include main.min.js.
- Inline CSS
- Responsive images via a CDN
- Removed Fontawesome
- Infinite scroll
- Removed the follow menu from the sidebar
- Embed video's in a figure element, with optional caption
- Replaced UglyfyJS with Terser drop in, which supports modern JS

## TODO

- Remove unused CSS
- Update location in URL bar during infinite scroll
- Fix search results layout (bg color, centring) (teaser image should be a link)
- Make favicons https://realfavicongenerator.net/ and put in /head/custom.html
- Get a lightbox without jQuery
- Show Tags on archive and post pages
- Pre-fill the search bar when clicking a tag and show search results (instead of Tag archive pages)
- Replace Lunr with Simple Jekyll Search https://github.com/christian-fei/Simple-Jekyll-Search https://blog.webjeda.com/instant-jekyll-search/

## Idea for hosting responsive images

Symlinks from webp to jpg if jpg is smaller.
Example source image ink:
https://debeer.it/s/2015/11/11/rap-karaoke-in-a-costume-minerva-open-day_respect.jpg
Example link to resized version:
https://debeer.it/s/2015/11/11/rap-karaoke-in-a-costume-minerva-open-day_respect/1920.jpg
I could resize and optimize the images with php libraries, or use the imagekit.io api to optimize them and store the results locally.
Would also ensure I don't max out the imagekit.io free tier.

## MacOS install notes

From [https://jekyllrb.com/docs/installation/macos/](https://jekyllrb.com/docs/installation/macos/).

```shell
brew install ruby
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.bash_profile

gem install --user-install bundler jekyll

ruby -v

# Append your path file with the following, replacing the X.X with the first two digits of your Ruby version:

echo 'export PATH="$HOME/.gem/ruby/2.7.0/bin:$PATH"' >> ~/.bash_profile

bundle install
bundle exec jekyll serve

# Or run with production environment to test e.g. HTML compression:
JEKYLL_ENV=production bundle exec jekyll serve

# Or serve outside of localhost (LAN):
JEKYLL_ENV=production bundle exec jekyll serve --host=0.0.0.0

# Build and minify JavaScript:
npm install
npm run build:js
```

