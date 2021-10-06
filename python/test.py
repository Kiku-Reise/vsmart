'''
=============SON OF GENISYS=====================
Astra members adding script
Coded by a dumbass kid- github.com/Cryptonian007
Apologies if anything in the code is dumb :)
Copy with credits
************************************************
'''

# import libraries
from telethon.sync import TelegramClient
from telethon.tl.types import InputPeerChannel
from telethon.errors.rpcerrorlist import PeerFloodError, UserPrivacyRestrictedError, PhoneNumberBannedError, ChatAdminRequiredError
from telethon.errors.rpcerrorlist import ChatWriteForbiddenError, UserBannedInChannelError, UserAlreadyParticipantError, FloodWaitError
from telethon.tl.functions.channels import InviteToChannelRequest
import sys
from telethon.tl.functions.messages import ImportChatInviteRequest, AddChatUserRequest
from telethon.tl.functions.channels import JoinChannelRequest
from telethon.tl.types import UserStatusRecently
import time
import random
from colorama import init, Fore
import os
import pickle
from datetime import datetime, timedelta

accounts = []
f = open('vars.txt', 'rb')
while True:
    try:
        accounts.append(pickle.load(f))

    except EOFError:
        break
numberAccount = 0;
for a in accounts:
    numberAccount += 1
    phn = a[0]
    if numberAccount > 564 :
        try:
            clnt = TelegramClient(f'sessions/{phn}', 2086188, '37d13b7e1e63bf7f1bd9e605f1ec1e2c')
            clnt.connect()
            if clnt.is_user_authorized():
                clnt.start(phn)
                acc_name = clnt.get_me().first_name
                try:
                    try:
                        clnt(JoinChannelRequest("https://t.me/WFXGSIGNALS"))
                        time.sleep(0.1)
                        #clnt(JoinChannelRequest("https://t.me/whaletradesmartai"))
                        
                        
                        print(f"{numberAccount}  : {phn} - {acc_name}")
                        time.sleep(0.5)
                    except UserAlreadyParticipantError:
                        pass 
                    except UserPrivacyRestrictedError:
                        continue
                except Exception as e:
                    continue
            else:
                print(f"{numberAccount} not connect : {phn}")
                continue
        except Exception as e:
                continue