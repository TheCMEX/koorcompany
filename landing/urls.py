from django.conf.urls import url
from landing.views import homepage

urlpatterns = [
    url(r'^$', homepage, name='homepage')
]