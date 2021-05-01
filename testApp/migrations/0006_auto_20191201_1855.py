# Generated by Django 3.0b1 on 2019-12-02 01:55

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('testApp', '0005_timeline_media_url'),
    ]

    operations = [
        migrations.RenameField(
            model_name='timeline',
            old_name='event_date',
            new_name='endDate',
        ),
        migrations.RemoveField(
            model_name='timeline',
            name='headline',
        ),
        migrations.RemoveField(
            model_name='timeline',
            name='text',
        ),
        migrations.AddField(
            model_name='timeline',
            name='caption',
            field=models.CharField(default=django.utils.timezone.now, max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='timeline',
            name='credit',
            field=models.CharField(default='', max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='timeline',
            name='startDate',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='timeline',
            name='story',
            field=models.CharField(default='', max_length=512),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='timeline',
            name='title',
            field=models.CharField(default='', max_length=128),
            preserve_default=False,
        ),
    ]
