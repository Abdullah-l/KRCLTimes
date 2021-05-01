from django.db import models
from django.core.validators import FileExtensionValidator


# Create your models here.

class Episode(models.Model):
    trackId = models.TextField()
    pub_date = models.DateField()

    def __str__(self):
        return self.trackId + " - " + str(self.pub_date)

class Timeline(models.Model):
    title = models.CharField(max_length=128)
    story = models.TextField(max_length=512)
    startDate = models.DateField(auto_now=False, auto_now_add=False)
    endDate = models.DateField(auto_now=False, auto_now_add=False, blank=True, null=True)
    fileUp = models.FileField(blank=True, null=True, validators=[FileExtensionValidator(allowed_extensions=['jpg','gif','png','jpeg','mp4','mp3','m4a','wav'])])
    media_url = models.URLField(max_length=200, blank=True, null=True)
    caption = models.CharField(max_length=64, blank=True, null=True)
    credit = models.CharField(max_length=64, blank=True, null=True)
    name = models.CharField(max_length=128, default="KRCL")
    email = models.EmailField(max_length=320, default="KRCL@krcl.org")
    approved = models.BooleanField(default=False)

    def __str__(self):
        aprv = "Not Approved / "
        if (self.approved):
            aprv = "Approved / "

        return aprv + self.title + " / Start Date: " + str(self.startDate) + " / By: " + self.name

