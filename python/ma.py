from telethon.sync import TelegramClient
from telethon.errors.rpcerrorlist import PhoneNumberBannedError
import pickle, os
from colorama import init, Fore
from time import sleep
import time
 
init()

n = Fore.RESET
lg = Fore.LIGHTGREEN_EX
r = Fore.RED
w = Fore.WHITE
cy = Fore.CYAN
ye = Fore.YELLOW
colors = [lg, r, w, cy, ye]

try:
    import requests
except ImportError:
    print(f'{lg}[i] Installing module - requests...{n}')
    os.system('pip install requests')

def banner():
    import random
    # fancy logo
    b = [
    '   _____             __',
    '  /  _  \    _______/  |_____________',
    ' /  /_\  \  /  ___/\   __\_  __ \__  \\',
    '/    |    \ \___ \  |  |  |  | \// __ \_',
    '\____|__  /____  >  |__|  |__|  (____   /',
    '        \/     \/                     \/'
    ]
    for char in b:
        print(f'{random.choice(colors)}{char}{n}')
    #print('=============SON OF GENISYS==============')
    print(f'   Version: 1.2 | Author: Cryptonian{n}\n')

def clr():
    if os.name == 'nt':
        os.system('cls')
    else:
        os.system('clear')
from os import listdir
from os.path import isfile, join
cwd = os.getcwd()
arr = os.listdir("./sessions")
with open('vars.txt', 'ab') as g:
    for f in arr:
        phone_number = f.replace('.session','')
        x = phone_number.find("journal")
        y = phone_number.find("+")
        if y == -1:
            source = cwd + "/sessions/" + f
            pa = cwd + "/sessions/+" + f
            print("Rename")
            os.rename(source, pa)
        if x == -1 :
            
            print("Add : "+phone_number)
            parsed_number = '+'.join(phone_number.split())
            clnt = TelegramClient(f'sessions/{parsed_number}', 3910389, '86f861352f0ab76a251866059a6adbd6')
            clnt.connect()
            if clnt.is_user_authorized():
                pickle.dump([parsed_number], g)
            time.sleep(0.5)
            clnt.disconnect()

exit()
while True:
    clr()
    banner()
    
    print(lg+'[5] Quit'+n)
    a = 1
    if a == 1:
        new_accs = []
        with open('vars.txt', 'ab') as g:
            number_to_add = 1
            for i in range(number_to_add):
                phone_number = str(input(f'\n{lg} [~] Enter Phone Number: {r}'))
                parsed_number = '+'.join(phone_number.split())
                pickle.dump([parsed_number], g)
                new_accs.append(parsed_number)
            print(f'\n{lg} [i] Saved all accounts in vars.txt')
            clr()
            print(f'\n{lg} [*] Logging in from new accounts\n')
            

        g.close()
    
    elif a == 5:
        clr()
        banner()
        exit()
