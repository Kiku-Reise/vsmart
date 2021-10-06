
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
from random import choice
from colorama import init, Fore
import os
import pickle
from datetime import datetime, timedelta
from telethon.tl.functions.channels import GetFullChannelRequest
from telethon.tl.functions.messages import GetHistoryRequest
init()


r = Fore.RED
lg = Fore.GREEN
rs = Fore.RESET
w = Fore.WHITE
grey = '\033[97m'
cy = Fore.CYAN
ye = Fore.YELLOW
colors = [r, lg, w, ye, cy]
info = lg + '[' + w + 'i' + lg + ']' + rs
error = lg + '[' + r + '!' + lg + ']' + rs
success = w + '[' + lg + '*' + w + ']' + rs
INPUT = lg + '[' + cy + '~' + lg + ']' + rs
plus = w + '[' + lg + '+' + w + ']' + rs
minus = w + '[' + lg + '-' + w + ']' + rs

def clr():
    if os.name == 'nt':
        os.system('cls')
    else:
        os.system('clear')

accounts = []
f = open('vars.txt', 'rb')
while True:
    try:
        accounts.append(pickle.load(f))
    except EOFError:
        break

chat = []
chat.append("Hi! Project real ?")
chat.append("yes i think real project")
chat.append("Where play game Admin")
chat.append("What is play game everybody")
chat.append("When list market..")
chat.append("Thank you sir. I can join this project hopefully I can get this good project..")
chat.append("What contract mainet..")
chat.append("this service airdrop free ?")
chat.append("best project")
chat.append("report scam")
chat.append("report scam not work")
chat.append("where i can add my token airdrop")
chat.append("Hi!")
chat.append("when start")
chat.append("Buy now..")
chat.append("Go to moon..")
chat.append("best tearm")
chat.append("give me info..")

chat.append("情報を教えてください..")
chat.append("最高のチーム..")
chat.append("今買う..")
chat.append("リスト市場の場合..")
chat.append("ゲーム管理者をプレイする場所")

chat.append ("ਹੈਲੋ! ਪ੍ਰੋਜੈਕਟ ਅਸਲ?")
chat.append ("ਹਾਂ ਮੈਨੂੰ ਲਗਦਾ ਹੈ ਕਿ ਅਸਲ ਪ੍ਰੋਜੈਕਟ")
chat.append ("ਗੇਮ ਐਡਮਿਨ ਕਿੱਥੇ ਖੇਡੋ")
chat.append ("ਹਰ ਕੋਈ ਪਲੇ ਗੇਮ ਕੀ ਹੈ")
chat.append ("ਜਦੋਂ ਸੂਚੀ ਬਾਜ਼ਾਰ ..")
chat.append ("ਧੰਨਵਾਦ ਸਰ. ਮੈਂ ਇਸ ਪ੍ਰੋਜੈਕਟ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਸਕਦਾ ਹਾਂ ਉਮੀਦ ਹੈ ਕਿ ਮੈਨੂੰ ਇਹ ਚੰਗਾ ਪ੍ਰੋਜੈਕਟ ਮਿਲ ਸਕਦਾ ਹੈ ..")
chat.append ("ਕਿਹੜਾ ਇਕਰਾਰਨਾਮਾ ਮੇਨੈਟ ..")
chat.append ("ਕਿਹੜਾ ਇਕਰਾਰਨਾਮਾ ਮੇਨੈਟ ..")
chat.append ("ਹੁਣੇ ਖਰੀਦੋ ..")
chat.append ("ਚੰਦਰਮਾ ਤੇ ਜਾਓ ..")
chat.append ("ਸਰਬੋਤਮ ਹੰਝੂ")
chat.append ("ਮੈਨੂੰ ਜਾਣਕਾਰੀ ਦਿਓ ..")


chat.append ("Привет! Проект настоящий?")
chat.append ("да, я думаю, настоящий проект")
chat.append ("Где играть в игру Админ")
chat.append ("В какую игру играют все")
chat.append ("Когда листинг маркет ..")
chat.append ("Спасибо, сэр. Я могу присоединиться к этому проекту, надеюсь, у меня получится этот хороший проект ..")
chat.append ("Какой контракт mainet ..")
chat.append ("Какой контракт mainet ..")
chat.append ("Купить сейчас ..")
chat.append ("Иди на Луну ..")
chat.append ("лучшая слезинка")
chat.append ("дайте мне информацию ...")



chat.append ("សួស្តី! គម្រោងពិតទេ?")
chat.append ("បាទខ្ញុំគិតគម្រោងពិត")
chat.append ("អ្នកគ្រប់គ្រងហ្គេមនៅឯណា")
chat.append ("តើអ្នកទាំងអស់គ្នាលេងហ្គេមអ្វី")
chat.append ("ពេលទីផ្សារបញ្ជី .. ")
chat.append ("អរគុណលោកគ្រូខ្ញុំអាចចូលរួមក្នុងគម្រោងនេះសង្ឃឹមថាខ្ញុំអាចទទួលបានគម្រោងល្អនេះ .. ")
chat.append ("តើកិច្ចសន្យាសំខាន់អ្វី .. ")
chat.append ("តើកិច្ចសន្យាសំខាន់អ្វី .. ")
chat.append ("ទិញឥឡូវនេះ .. ")
chat.append ("ទៅឋានព្រះច័ន្ទ .. ")
chat.append ("ទឹកភ្នែកល្អបំផុត")
chat.append ("ផ្តល់ព័ត៌មានមកខ្ញុំ .. ")
chat.append ("https://vsmart.ltd mainnet admin ? how much reward ?")
chat.append ("https://vsmart.ltd mainnet admin ? how much reward ?")

channel = "https://t.me/vsmartchannel";
target = "https://t.me/smartiqx";
postid = 0
while True:
	#value = randint(1, 627)
	phn = choice(accounts)[0]
	print(f'Connect : {phn}')
	clnt = TelegramClient(f'sessions/{phn}', 3910389, '86f861352f0ab76a251866059a6adbd6')
	clnt.connect()

	print(f'User: {phn} -- Starting session... ')
	
	clnt.start(phn)
	acc_name = clnt.get_me().first_name
	clnt(JoinChannelRequest(channel))
	clnt(JoinChannelRequest(target))

	target_entity = clnt.get_entity(target)
	target_details = InputPeerChannel(target_entity.id, target_entity.access_hash)
	channel_info = clnt(GetFullChannelRequest(target_entity))
	postid = channel_info.full_chat.pinned_msg_id
	rand = random.randint(1, 10)
	if rand == 3 or rand == 6 or rand == 9:
		clnt.send_message(entity=target_details.channel_id, message=choice(chat),reply_to=postid)
		print(f'Post reply{postid}')
	else:
		clnt.send_message(entity=target_details.channel_id, message=choice(chat))
		print(f'Post no reply')

    
	time.sleep(random.randint(180, 600))
	clnt.disconnect()
	time.sleep(random.randint(180, 600))

