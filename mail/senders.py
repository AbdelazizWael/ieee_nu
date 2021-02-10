from django.core.mail import send_mail
from django.template.loader import render_to_string


class TemplatedTextEmail:

    def __init__(self):
        pass

    def send(self, subject, to, template, context=None):
        text_content = render_to_string(template, context)
        send_mail(
            subject=subject,
            message=text_content,
            from_email=None,
            recipient_list=[to],
        )
