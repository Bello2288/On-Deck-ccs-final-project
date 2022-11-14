import os
from twilio.rest import Client


account_sid = os.environ['TWILIO_ACCOUNT_SID'] 
auth_token = os.environ['TWILIO_AUTH_TOKEN'] 
my_phone_number = os.environ['MY_PHONE_NUMBER']   
twilio_phone_number = os.environ['TWILIO_PHONE_NUMBER']  
client = Client(account_sid, auth_token)

message = client.messages.create(
    # the creator's phone number (mine for testing)
    to=my_phone_number,
    # from the phone number set up in my free Twilio account
    from_=twilio_phone_number,
    body="Hello from Python!"
)
print('sent')


# # Download the helper library from https://www.twilio.com/docs/python/install
# import os
# import twilio
# import twilio.rest import Client

# # Find your Account SID and Auth Token in Account Info and set the environment variables.
# # See http://twil.io/secure
# account_sid = os.environ['TWILIO_ACCOUNT_SID']
# auth_token = os.environ['TWILIO_AUTH_TOKEN']
# client = Client(account_sid, auth_token)

# message = client.messages.create(
#   body='Hi there',
#   from_='+13609941205',
#   to='+18646268863'
# )

# print(message.sid)


# import os
# import twilio
# import twilio.rest

# account_sid = os.environ['TWILIO_ACCOUNT_SID'] 
# auth_token = os.environ['TWILIO_AUTH_TOKEN'] 
# my_phone_number = os.environ['MY_PHONE_NUMBER']   
# twilio_phone_number = os.environ['TWILIO_PHONE_NUMBER'] 

# try:
#     client = twilio.rest.TwilioRestClient(account_sid, auth_token)

#     message = client.messages.create(
#         body="Hello World",
#         from_=twilio_phone_number,
#         to=my_phone_number,
#     )
# except twilio.TwilioRestException as e:
#   print (e) 
# print('sent')