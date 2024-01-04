#
# Copyright (c) 2013, Prometheus Research, LLC
#


from __future__ import unicode_literals
from docutils import nodes
from docutils.parsers.rst import Directive, directives
from sphinx.util import docname_join
from sphinx.util.docutils import new_document
import os.path
import datetime
import collections
import dateutil.parser


class FeedDirective(Directive):

    has_content = True
    option_spec = {
            'rss': directives.unchanged,
            'title': directives.unchanged,
            'link': directives.unchanged,
            'description': directives.unchanged,
    }

    def run(self):
        env = self.state.document.settings.env
        output = []
        includefiles = []
        for entry in self.content:
            if not entry:
                continue
            docname = docname_join(env.docname, entry)
            if docname not in env.found_docs:
                output.append(self.state.document.reporter.warning(
                    'feed contains a reference to nonexisting '
                    'document %r' % docname, line=self.lineno))
                env.note_reread()
            else:
                includefiles.append(docname)
        subnode = feed()
        subnode['entries'] = includefiles
        subnode['rss'] = self.options.get('rss')
        subnode['title'] = self.options.get('title', '')
        subnode['link'] = self.options.get('link', '')
        subnode['description'] = self.options.get('description', '')
        output.append(subnode)
        return output


class feed(nodes.General, nodes.Element):
    pass


def process_feed(app, doctree, fromdocname):
    env = app.builder.env
    document = new_document('')

    for node in doctree.traverse(feed):
        rss_filename = node['rss']
        rss_title = node['title']
        rss_link = node['link']
        rss_description = node['description']
        rss_date = datetime.datetime.utcnow()
        rss_items = []
        for docname in node['entries']:
            entry = env.get_doctree(docname)
            title = entry.next_node(nodes.section)
            first_year = title.next_node(nodes.section)

            for year in first_year.traverse(
                nodes.section, descend=False, siblings=True
            ):
                first_subsection = year.next_node(nodes.section)
                for subsection in first_subsection.traverse(
                    nodes.section, descend=False, siblings=True
                ):
                    if app.builder.format == 'html':
                        # date
                        date = subsection.next_node(nodes.title).astext().split(":")[0]
                        rss_item_date = dateutil.parser.parse(date.strip())

                        # link
                        rss_item_link = node["link"] + "#" + subsection['ids'][0]

                        # title
                        title = subsection.next_node(nodes.title)

                        document += title
                        app.env.resolve_references(
                            document,
                            node['link'],
                            app.builder,
                        )
                        document.remove(title)

                        rss_item_title = title.astext()

                        # description
                        pars = []
                        for b in subsection.traverse(nodes.paragraph):
                            for p in b.traverse(nodes.paragraph):
                                pars.append(p)

                        rss_item_description = nodes.compound()
                        for p in pars:
                            rss_item_description += p.deepcopy()

                        document += rss_item_description
                        app.env.resolve_references(
                            document,
                            node['link'],
                            app.builder,
                        )
                        document.remove(rss_item_description)

                        rss_item_description = "\n".join(
                            app.builder.render_partial(p)['body']
                            for p in rss_item_description
                        )
                        if True:
                            print("--------------------------------------------")
                            print("--------------------------------------------")
                            print("--------------------------------------------")
                            print("newsfeed item:")
                            print("    title:", rss_item_title)
                            print("    date:", rss_item_date)
                            print("    link:", rss_item_link)
                            print("    desc:", rss_item_description)
                            print(" ", flush=True)

                        rss_item = RSSItem(
                            rss_item_title,
                            rss_item_link,
                            rss_item_description,
                            rss_item_date,
                        )
                        rss_items.append(rss_item)

        node.replace_self([])

        if app.builder.format == 'html':
            rss_feed = RSSFeed(
                rss_title,
                rss_link,
                rss_description,
                rss_date,
                rss_items,
            )
            if rss_filename:
                rss_path = os.path.join(app.builder.outdir, rss_filename)
                with open(rss_path, 'wb') as rss_stream:
                    write_rss(rss_feed, rss_stream)


RSSFeed = collections.namedtuple(
    'RSSFeed',
    ['title', 'link', 'description', 'date', 'items']
)
RSSItem = collections.namedtuple(
    'RSSItem',
    ['title', 'link', 'description', 'date']
)


def format_text(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def format_date(date):
    return "%s, %02d %s %04d %02d:%02d:%02d GMT" % (
            ("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")[date.weekday()],
            date.day,
            ("Jan", "Feb", "Mar", "Apr", "May", "Jun",
             "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")[date.month-1],
            date.year,
            date.hour,
            date.minute,
            date.second,
    )


def write_rss(rss_feed, stream):
    lines = []
    lines.append('''<?xml version="1.0" encoding="utf-8"?>\n''')
    lines.append('''<rss version="2.0">\n''')
    lines.append('''  <channel>\n''')
    lines.append('''    <title>%s</title>\n''' % format_text(rss_feed.title))
    lines.append('''    <link>%s</link>\n''' % format_text(rss_feed.link))
    lines.append(
        '''    <description>%s</description>\n'''
        % format_text(rss_feed.description)
    )
    lines.append(
        '''    <lastBuildDate>%s</lastBuildDate>\n'''
        % format_date(rss_feed.date)
    )
    lines.append('''    <generator>sphinxcontrib-newsfeed</generator>\n''')
    for item in rss_feed.items:
        lines.append('''    <item>\n''')
        lines.append(
            '''      <title>%s</title>\n'''
            % format_text(item.title)
        )
        lines.append(
            '''      <link>%s</link>\n'''
            % format_text(item.link)
        )
        lines.append(
            '''      <description>%s</description>\n'''
            % format_text(item.description)
        )
        lines.append(
            '''      <guid>%s</guid>\n'''
            % format_text(item.link)
        )
        lines.append(
            '''      <pubDate>%s</pubDate>\n'''
            % format_date(item.date)
        )
        lines.append('''    </item>\n''')
    lines.append('''  </channel>\n''')
    lines.append('''</rss>\n''')
    for line in lines:
        stream.write(line.encode('utf-8'))


def visit_skip(self, node):
    raise nodes.SkipNode


def setup(app):
    app.add_directive('feed', FeedDirective)
    app.add_node(
        feed,
        html=(visit_skip, None),
        latex=(visit_skip, None),
        text=(visit_skip, None),
    )
    app.connect(str('doctree-resolved'), process_feed)
