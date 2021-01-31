from django.db import models

from authentication.models import User


class Product(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField()
    price = models.FloatField()
    image = models.ImageField()
    count = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Product({self.name})"


class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    count = models.IntegerField()
    added = models.DateTimeField(auto_now_add=True)
    verified = models.BooleanField(default=False)
    compound_price = models.FloatField(default=0)
    previous_count = models.IntegerField(default=0)

    def __str__(self):
        return f"CartObject({self.customer.__str__()})"


class Purchase(models.Model):
    products = models.JSONField()
    customer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='history')
    full_price = models.FloatField()
    verified_on = models.DateTimeField(auto_now_add=True)
    verified_by = models.ForeignKey(User, on_delete=models.CASCADE)
