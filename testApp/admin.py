from django.contrib import admin

from .models import Episode, Timeline

admin.site.site_header = "RadioACTive Admin"
admin.site.site_title = "RadioACTive Admin Area"
admin.site.index_title = "Welcome to the RadioACTive admin area"

admin.site.register(Episode)
admin.site.register(Timeline)