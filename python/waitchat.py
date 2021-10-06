'''
=============SON OF GENISYS=====================
Astra members adding script
Coded by a dumbass kid- github.com/Cryptonian007
Apologies if anything in the code is dumb :)
Copy with credits
************************************************
'''

# import libraries
from telethon.sync import TelegramClient, events, utils
from telethon.tl.types import InputPeerChannel, InputPeerUser
from telethon.errors.rpcerrorlist import PeerFloodError, UserPrivacyRestrictedError, PhoneNumberBannedError, ChatAdminRequiredError
from telethon.errors.rpcerrorlist import ChatWriteForbiddenError, UserBannedInChannelError, UserAlreadyParticipantError, FloodWaitError
from telethon.tl.functions.channels import InviteToChannelRequest
import sys
from telethon.tl.functions.messages import ImportChatInviteRequest, AddChatUserRequest
from telethon.tl.functions.channels import JoinChannelRequest
from telethon.tl.types import UserStatusRecently
import time
import random
from random import choice
from colorama import init, Fore
import os
import pickle
from datetime import datetime, timedelta
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="airdroptoken"
)

mycursor = mydb.cursor()



init()
scraped_grp = "https://t.me/Coin365_Group"
target = "https://t.me/StarsBattle"
sourceChannelsID=['cointiger_en','swapz_app','WanakaOfficial','tenfinance']
client = TelegramClient(f'sessions/+84932013138', 3910389 , '86f861352f0ab76a251866059a6adbd6')
client.connect()
client.start()
target_entity = client.get_entity(target)
target_details = InputPeerChannel(target_entity.id, target_entity.access_hash)

report_entity = client.get_entity("https://t.me/DevStarts")
report_details = InputPeerChannel(report_entity.id, report_entity.access_hash)

for to_g in sourceChannelsID:
	client(JoinChannelRequest('https://t.me/'+to_g))
	print(f'JOIN : https://t.me/'+to_g)

accounts = []
f = open('vars.txt', 'rb')
while True:
    try:
        accounts.append(pickle.load(f))
    except EOFError:
        break

@client.on(events.NewMessage(chats = sourceChannelsID,outgoing=False))
async def my_event_handler(event):
	
	chat_from = event.chat if event.chat else (await event.get_chat())
	friend  = await client.get_entity(event.message.from_id)
	#print(f'{friend} {target_entity.id}')
	if friend.bot == False :
		
		mycursor.execute("SELECT * FROM telegram_user WHERE id='{friend.id}' LIMIT 1")
		myresult = mycursor.fetchone()
		
		if myresult == None:
			sql = "INSERT INTO telegram_user (id, hash, username, first_name, last_name, phone) VALUES (%s, %s, %s, %s, %s, %s)"
			
			val = (friend.id, friend.access_hash,friend.username, friend.first_name, friend.last_name, friend.phone)
			mycursor.execute(sql, val)
			mydb.commit()
			#await join_member()
		
		msgtext = f'{friend.first_name} ID : {friend.id} Username : {friend.username} Hash : {friend.access_hash} vua chat trong room {chat_from.title}'
		print(f'{msgtext}')
		#await client.send_message(entity=report_entity.id, message=msgtext)
    #if event.chat_id in sourceChannelsID:
    #	print(f'{event}')


		
client.run_until_disconnected()