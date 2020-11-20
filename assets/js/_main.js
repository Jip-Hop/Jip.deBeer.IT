// Lunr index
var idx;

(function () {
  function fixImage(target) {
    var fallback = target.dataset.fallback;
    target.removeAttribute("data-fallback");
    target.src = fallback;
    target.removeAttribute("srcset");
  }

  function loaded(fn) {
    if (document.readyState === "complete") {
      fn();
    } else {
      window.addEventListener("load", fn);
    }
  }

  loaded(() => {
    // Fix remaining images which failed before we could setup the event listener on the body,
    // or which otherwise didn't fire an error event before
    document.querySelectorAll("img[data-fallback]").forEach((target) => {
      console.log(target.complete, target.naturalHeight, target);
      if (target.complete && target.naturalHeight === 0) {
        // Done loading but image doesn't have any size
        fixImage(target);
      }
    });
  });

  function ready(fn) {
    if (document.readyState != "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  ready(function () {
    // Setup early, also fires for dynamically inserted images
    document.body.addEventListener(
      "error",
      (e) => {
        console.log("body error", e.target);
        var target = e.target;
        if (target.tagName === "IMG" && target.hasAttribute("data-fallback")) {
          fixImage(target);
        }
      },
      true // <-- useCapture
    );

    var scroller = document.querySelector("#main > .archive .entries-list");

    if (scroller) {
      var pagination = document.querySelector("#main > .archive .pagination");

      if (
        "IntersectionObserver" in window &&
        "IntersectionObserverEntry" in window &&
        "intersectionRatio" in window.IntersectionObserverEntry.prototype
      ) {
        // IntersectionObserver is natively supported.
        pagination.remove();
        document
          .querySelector("#main > .archive [data-infinite-scroll]")
          .remove(); // Only used as a delimiter when fetching HTML
        document
          .querySelector("#main > .archive")
          .insertAdjacentHTML(
            "beforeend",
            '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'
          );
        var spinner = document.querySelector("#main > .archive .lds-ellipsis");
        var counter = 2;
        var baseUrl = window.location.origin + window.location.pathname;
        var page = window.location.pathname.split("/");
        page.pop(); // Remove last entry
        page = page.pop(); // Get last entry
        if (page.startsWith("page")) {
          // Start with fetching next page
          counter = parseInt(page.split("page").pop()) + 1;
          baseUrl += "../";
        }
        var isLoadingMorePosts = false;

        function loadItems() {
          if (isLoadingMorePosts) {
            return;
          }

          isLoadingMorePosts = true;
          fetch(baseUrl + "/page" + counter + "/")
            .then(function (response) {
              switch (response.status) {
                // status "OK"
                case 200:
                  return response.text();
                // status "Not Found"
                case 404:
                  // 404 means we've reached the end, fetched all available pages
                  intersectionObserver.unobserve(spinner);
                  spinner.remove();
              }
            })
            .then(function (html) {
              // This is the HTML from our response as a text string
              // Note: maybe better to use DOMParser instead of regex with delimiters

              const delimiter1 = '<div class="entries-list">';
              const delimiter2 = "<i data-infinite-scroll";

              var regExString = new RegExp(
                "(?:" + delimiter1 + ")((.[\\s\\S]*))(?:" + delimiter2 + ")",
                "ig"
              );
              var testRE = regExString.exec(html);
              if (testRE && testRE.length > 1) {
                //RegEx has found something and has more than one entry.
                scroller.insertAdjacentHTML("beforeend", testRE[1]);
                counter++;
              }
            })
            .catch(function (err) {
              console.log(err);
            })
            .finally(function () {
              isLoadingMorePosts = false;
            });
        }

        var intersectionObserver = new IntersectionObserver(function (entries) {
          // If the browser is busy while scrolling happens, multiple entries can
          // accumulate between invocations of this callback. As long as any one
          // of the notifications reports the spinner within the scrolling viewport,
          // we add more content.
          if (
            entries.some(function (entry) {
              return entry.intersectionRatio > 0;
            })
          ) {
            loadItems();
          }
        });
        intersectionObserver.observe(spinner);
      } else {
        // Fall back to pagination buttons
        pagination.style = "display: flex";
      }
    }

    // Close search screen with Esc key
    document.addEventListener("keyup", function (e) {
      if (e.key === "Escape") {
        var initialContent = document.querySelector(".initial-content");
        if (initialContent && initialContent.classList.contains("is--hidden")) {
          document
            .querySelector(".search-content")
            ?.classList.remove("is--visible");
          initialContent.classList.remove("is--hidden");
        }
      }
    });

    // Lunr stuff
    function loadScript(src, callback) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.onload = callback;
      script.src = src;
      document.head.appendChild(script);
    }

    function loadList(list, i, callback) {
      loadScript(list[i], function () {
        if (i < list.length - 1) {
          loadList(list, i + 1, callback);
        } else {
          callback();
        }
      });
    }

    // Get relative path to the js assets folder
    var pathToJsFolder = document.currentScript.src.substr(
      0,
      document.currentScript.src.lastIndexOf("/")
    );

    // Load lunr dependencies the first time the search icon is clicked

    // Search toggle
    var searchToggle = document.querySelector(".search__toggle");
    if (searchToggle) {
      function loadSearchResults() {
        searchToggle.removeEventListener("click", loadSearchResults);
        searchToggle.addEventListener("click", toggleSearchView);
        toggleSearchView();

        loadList(
          [
            pathToJsFolder + "/lunr/lunr.min.js",
            pathToJsFolder + "/lunr/lunr-store.js",
          ],
          0,
          function () {
            // code that applies after all URLs in jsList have loaded
            idx = lunr(function () {
              this.field("title");
              this.field("excerpt");
              this.field("tags");
              this.ref("id");

              this.pipeline.remove(lunr.trimmer);

              for (var item in store) {
                this.add({
                  title: store[item].title,
                  excerpt: store[item].excerpt,
                  tags: store[item].tags,
                  id: item,
                });
              }
            });

            var searchInput = document.getElementById("search");
            if (searchInput) {
              searchInput.addEventListener("keyup", function () {
                var resultdiv = document.getElementById("results");
                if (!resultdiv) {
                  return;
                }
                var query = searchInput.value.toLowerCase();
                var result = idx.query(function (q) {
                  query
                    .split(lunr.tokenizer.separator)
                    .forEach(function (term) {
                      q.term(term, { boost: 100 });
                      if (query.lastIndexOf(" ") != query.length - 1) {
                        q.term(term, {
                          usePipeline: false,
                          wildcard: lunr.Query.wildcard.TRAILING,
                          boost: 10,
                        });
                      }
                      if (term != "") {
                        q.term(term, {
                          usePipeline: false,
                          editDistance: 1,
                          boost: 1,
                        });
                      }
                    });
                });
                resultdiv.innerHTML =
                  '<p class="results__found">' +
                  result.length +
                  " Result(s) found</p>";
                for (var item in result) {
                  var ref = result[item].ref;
                  var searchitem =
                    '<div class="list__item">' +
                    '<article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">' +
                    '<a href="' +
                    store[ref].url +
                    '" rel="permalink">' +
                    '<h2 class="archive__item-title" itemprop="headline">' +
                    store[ref].title +
                    "</h2>" +
                    '<div class="archive__item-teaser">' +
                    store[ref].teaser +
                    "</div>" +
                    '<p class="archive__item-excerpt" itemprop="description">' +
                    store[ref].excerpt.split(" ").splice(0, 20).join(" ") +
                    "...</p>" +
                    "</a>" +
                    "</article>" +
                    "</div>";
                  resultdiv.insertAdjacentHTML("beforeend", searchitem);
                }
              });
            }
          }
        );
      }

      function toggleSearchView() {
        window.scrollTo(0, 0);
        document
          .querySelector(".search-content")
          ?.classList.toggle("is--visible");
        document
          .querySelector(".initial-content")
          ?.classList.toggle("is--hidden");
        document.querySelector(".search-content input")?.focus();
      }

      searchToggle.addEventListener("click", loadSearchResults);
    }
  });
})();
