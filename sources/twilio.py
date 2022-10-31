import os
from twilio.rest import Client


# account_sid = os.environ['TWILIO_ACCOUNT_SID'] 
account_sid = 'ACac91b05c269eaffc211556683ccb7d86'
# auth_token = os.environ['TWILIO_AUTH_TOKEN'] 
auth_token = '0a1a8de0b8f4fb48d1ac05d9bf793b66'
# my_phone_number = os.environ['MY_PHONE_NUMBER']   
# twilio_phone_number = os.environ['TWILIO_PHONE_NUMBER']  
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
    # the creator's phone number (mine for testing)
    # to=my_phone_number,
    to='+18646268863',

    # from the phone number set up in my free Twilio account
    # from_=twilio_phone_number,
    from_='+13609941205',

    body="Hello from Python!"
)
print('sent')