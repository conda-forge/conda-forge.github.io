#
# Copyright (c) 2013, Prometheus Research, LLC
#


from setuptools import setup


NAME = "sphinxcontrib-newsfeed"
VERSION = "0.1.4"
DESCRIPTION = "News Feed extension for Sphinx"
LONG_DESCRIPTION = open('README.md').read()
AUTHOR = "Kirill Simonov (Prometheus Research, LLC)"
AUTHOR_EMAIL = "xi@resolvent.net"
LICENSE = "BSD"
URL = "https://github.com/prometheusresearch/sphinxcontrib-newsfeed"
DOWNLOAD_URL = "http://pypi.python.org/pypi/sphinxcontrib-newsfeed"
CLASSIFIERS = [
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Documentation',
        'Topic :: Text Processing',
]
PLATFORMS = 'any'
INSTALL_REQUIRES = ['Sphinx']
PACKAGES = ['sphinxcontrib']
ZIP_SAFE = False
INCLUDE_PACKAGE_DATA = True
NAMESPACE_PACKAGES = ['sphinxcontrib']


setup(name=NAME,
      version=VERSION,
      description=DESCRIPTION,
      long_description=LONG_DESCRIPTION,
      author=AUTHOR,
      author_email=AUTHOR_EMAIL,
      license=LICENSE,
      url=URL,
      download_url=DOWNLOAD_URL,
      classifiers=CLASSIFIERS,
      platforms=PLATFORMS,
      install_requires=INSTALL_REQUIRES,
      packages=PACKAGES,
      zip_safe=ZIP_SAFE,
      include_package_data=INCLUDE_PACKAGE_DATA,
      namespace_packages=NAMESPACE_PACKAGES)
