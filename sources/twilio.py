import os
from twilio.rest import Client


account_sid = os.environ['TWILIO_ACCOUNT_SID'] 
auth_token = os.environ['TWILIO_AUTH_TOKEN'] 
my_phone_number = os.environ['MY_PHONE_NUMBER']   
twilio_phone_number = os.environ['TWILIO_PHONE_NUMBER']  
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
    # the creator's phone number (mine for testing)
    to=my_phone_number,
    # from the phone number set up in my free Twilio account
    from_=twilio_phone_number,
    body="Hello from Python!"
)
print('sent')