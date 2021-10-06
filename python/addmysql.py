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
from telethon.tl.types import InputPeerChannel, InputPeerUser
from telethon.errors.rpcerrorlist import PeerFloodError, UserPrivacyRestrictedError, PhoneNumberBannedError, ChatAdminRequiredError
from telethon.errors.rpcerrorlist import ChatWriteForbiddenError, UserBannedInChannelError, UserAlreadyParticipantError, FloodWaitError
from telethon.tl.functions.channels import InviteToChannelRequest
import sys
from telethon.tl.functions.messages import ImportChatInviteRequest, AddChatUserRequest
from telethon.tl.functions.channels import JoinChannelRequest
from telethon.tl.types import UserStatusRecently
from telethon.tl.types import InputPhoneContact
from telethon.tl.functions.contacts import ImportContactsRequest
import time
import random
from datetime import datetime
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
accounts = []
f = open('vars.txt', 'rb')
while True:
    try:
        accounts.append(pickle.load(f))
    except EOFError:
        break
print(f'Total accounts: {len(accounts)}')
target = "https://t.me/smartiqx"


while True:
	phn = choice(accounts)[0]
	print(f'Connect : {phn}')
	clnt = TelegramClient(f'sessions/{phn}', 3910389, '86f861352f0ab76a251866059a6adbd6')
	
	
	clnt.connect()
	if not clnt.is_user_authorized():
		break
	clnt.start()
	target_entity = clnt.get_entity(target)
	target_details = InputPeerChannel(target_entity.id, target_entity.access_hash)
	acc_name = clnt.get_me(input_peer=True).user_id

	peer_flood_status = 0
	mycursor.execute("SELECT id, hash, username, join_by FROM telegram_user WHERE join_by='' AND sms=0 LIMIT 5")
	myresult = mycursor.fetchall()
	for user in myresult:
		time.sleep(5)
		
		try:
			user_to_add = clnt.get_input_entity(user[2])
			clnt(InviteToChannelRequest(target_details, [user_to_add]))

			target_entity_channel = clnt.get_entity('https://t.me/signalvsmart')
			target_entity_channel_detail = InputPeerChannel(target_entity.id, target_entity.access_hash)
			clnt(JoinChannelRequest(target_entity_channel))
			clnt(InviteToChannelRequest(target_entity_channel_detail, [user_to_add]))
			#clnt(AddChatUserRequest(target_entity_channel.id, user_to_add,42))
			
			
			now = datetime.utcnow()
			updatetime = now.strftime('%Y-%m-%d %H:%M:%S')
			sql = f"UPDATE telegram_user SET join_at='{updatetime}', join_by = '{phn}' WHERE id = '{user[0]}'"
			mycursor.execute(sql)
			mydb.commit()
			time.sleep(random.randrange(30, 180))
		except UserPrivacyRestrictedError:
			#if user[6] != "":
			#	contact = InputPhoneContact(client_id=0, phone=user[6], first_name=user[4], last_name=user[5])
			#	result = clnt(ImportContactsRequest([contact]))
			#	print(f'Add Contract : {result}')
			user_to_add = clnt.get_input_entity(user[2])
			msg = f'Hi! This this channel free Airdrop Crypto, Forex your can join {target}'
			clnt.send_message(entity=user_to_add,message=msg)
			
			sql = f"UPDATE telegram_user SET sms='1' WHERE id = '{user[0]}'"
			mycursor.execute(sql)
			mydb.commit()
			print(f'User: {acc_name} -- Settings User can not add, Send msg {msg}, SQL : {sql}')
			continue
		except PeerFloodError:
			print(f'Gioi han thoi gian can nghi ngoi mot thoi gian')
			peer_flood_status += 1
			continue
		except ChatWriteForbiddenError:
			print(f'Khong co quyen add member. can lien he admin')
		except UserBannedInChannelError:
			print(f'Banned from writing in groups')
			break
		except ChatAdminRequiredError:
			print(f'Can quyen admin moi add duoc')
			break
		except UserAlreadyParticipantError:
			print(f'Thanh vien da co mat trong group')
			continue
		except FloodWaitError as e:
			print(f'{e}')
			break
		except ValueError:
			print(f'Error in Entity')
			continue
		except KeyboardInterrupt:
			print(f'---- Adding Terminated ----')
			break
		except Exception as e:
			print(f'{e}')
			continue
	clnt.disconnect()

	time.sleep(random.randrange(300, 600))