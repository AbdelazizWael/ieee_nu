from mail.senders import TemplatedTextEmail
import datetime


def send_order_confirmation_mail(user, order):
    subject = '[IEEE NU] Order Placed'
    to = [user.profile.email]
    template = 'order_confirmation.txt'
    delivery_date = str(datetime.datetime.date(order.delivery_time))
    context = {
        'full_name': user.profile.full_name,
        'order_id': order.id,
        'delivery_date': delivery_date
    }

    msg = TemplatedTextEmail()
    msg.send(subject, to, template, context)


def send_order_cancelation_mail(user, order):
    subject = '[IEEE NU] Order Canceled'
    to = [user.profile.email]
    template = 'order_cancelation.txt'
    delivery_date = str(datetime.datetime.date(order.delivery_time))
    context = {
        'full_name': user.profile.full_name,
        'order_id': order.id,
    }

    msg = TemplatedTextEmail()
    msg.send(subject, to, template, context)


def send_order_receipt_mail(customer, history):
    pass
