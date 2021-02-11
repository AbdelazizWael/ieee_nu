from django.core.mail import send_mail
from django.template.loader import render_to_string


class TemplatedEmail:

    def __init__(self):
        pass

    def send(self, subject, to, template, context=None):
        text_content = render_to_string(template + '.txt', context)
        # html_content = render_to_string(template + '.html', context)
        send_mail(
            subject=subject,
            message=text_content,
            from_email=None,
            recipient_list=to,
            # html_message=html_content
        )
