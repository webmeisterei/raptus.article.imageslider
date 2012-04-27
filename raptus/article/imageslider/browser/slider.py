from zope.interface.declarations import implements
from raptus.article.core.interfaces import IComponent, IComponentSelection,\
    IArticle, IManageable
from zope.component import adapts
from zope.interface.interface import Interface
from plone.app.layout.viewlets.common import ViewletBase
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from raptus.article.images.interfaces import IImages
from zope.component import getMultiAdapter
try: # Plone 4 and higher
    from Products.ATContentTypes.interfaces.image import IATImage
except: # BBB Plone 3
    from Products.ATContentTypes.interface.image import IATImage

from raptus.article.core import RaptusArticleMessageFactory as _

class ISlider(Interface):
    """A marker interface for sliding images viewlet
    """


class ComponentTeaser(object):
    """ Component which displays content images in a carousel
    """
    implements(IComponent, IComponentSelection)
    adapts(IArticle)

    title = _(u'Imageslider (Teaser)')
    description = _(u"Display an image slider above the content which uses"
                     "content aware images as source.")
    image = '++resource++slider-teaser.gif'
    interface = ISlider
    viewlet = 'raputs.article.imageslider.teaser'

    def __init__(self, context):
        self.context = context



class ViewletTeaser(ViewletBase):
    """ Viewlet showing the image fader over the whole width
    """
    index = ViewPageTemplateFile('slider.pt')
    component = 'imageslider.teaser'
    fade_time = 1500
    halt_time = 6000
    css_class = 'sliderTeaser'

    @property
    def images(self):
        items = []
        try:
            provider = IImages(self.context)
            images = provider.getImages(component=self.component)
        except TypeError:
            images = []

        if not images:
            pstate = getMultiAdapter(
                (self.context, self.request), name='plone_portal_state')

            try:
                provider = IImages(pstate.portal()['fader-images'])
                images = provider.getImages()
            except (TypeError, KeyError):
                images = []

        manageable = IManageable(self.context)
        images = manageable.getList(images, self.component)

        for image in images:
            obj = image['obj']

            image.update({
                'class': '',
                'caption': obj.Title(),
                'description': obj.Description(),
                'img_url': obj.absolute_url(),
            })

            if 'show' in image and image['show']:
                image['class'] += ' hidden'

            items.append(image)

        return items
