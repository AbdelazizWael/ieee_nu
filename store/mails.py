from mail.senders import TemplatedEmail
import datetime


def send_order_confirmation_mail(user, order):
    subject = '[IEEE NU] Order Placed'
    to = [user.profile.email]
    template = 'order_confirmation'
    delivery_date = str(datetime.datetime.date(order.delivery_time))
    context = {
        'full_name': user.profile.full_name,
        'order_id': order.id,
        'delivery_date': delivery_date
    }

    msg = TemplatedEmail()
    msg.send(subject, to, template, context)


def send_order_cancelation_mail(user, order):
    subject = '[IEEE NU] Order Canceled'
    to = [user.profile.email]
    template = 'order_cancelation'
    delivery_date = str(datetime.datetime.date(order.delivery_time))
    context = {
        'full_name': user.profile.full_name,
        'order_id': order.id,
    }

    msg = TemplatedEmail()
    msg.send(subject, to, template, context)


def send_order_receipt_mail(customer, history):
    pass
