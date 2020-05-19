import smtplib

def send_email(SenderAddress, SenderPassword, recipientAddress, msg, subject):
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(SenderAddress, SenderPassword)
    body = "Subject: {}\n\n{}".format(subject, msg)
    server.sendmail(SenderAddress, recipientAddress, body)
    server.quit()

