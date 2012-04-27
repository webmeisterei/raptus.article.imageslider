Introduction
============

Show contained images in a `jQueryTOOLS scrollable`__ carousel.
(Does not use raptus.easyslider because jquerytools is shipped with Plone)

.. __: http://jquerytools.org/demos/scrollable/index.html

The reason for this being not integrated in `raptus.article.slider` is that
the latter depends on `raptus.article.nesting`.

The following features for `raptus.article` are provided by this package:

Components
----------

* Image Slider (Slider of images contained in the article) (XXX TODO)
* Image Slider Teaser (Slider of images contained in the article displayed above the columns)

TODOS
-----

XXX
show navigation buttons
locales directory
images for components
properties for configuration of the scrollable and use those in the stylesheet


Dependencies
------------

* raptus.article.images

Installation
============

Please refer to `raptus.article.gallery`_

.. _`raptus.article.gallery`: http://pypi.python.org/pypi/raptus.article.gallery


Usage
=====

Components
----------

Navigate to the "Components" tab of your article and select one of the gallery
components and press "save and view". Note that at least one image has to be contained
in the article in which this component is active.


