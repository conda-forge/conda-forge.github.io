# hacked up sphinxcontrib-newsfeed

This is a hacked up version of `sphinxcontrib-newsfeed` that is able to turn
our announcements page into an RSS feed.

## Usage

To enable this extension, add the following line to `conf.py`:

```python
extensions.append('sphinxcontrib.newsfeed')
```

Then in the `index.rst` you add


```rst
.. feed::
   :rss: news.rss
   :title: 'conda-forge news & announcements'

   user/announcements
```

See our `announcements.rst` file for how to format the page so that the extension
produces the correct RSS.
