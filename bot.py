import "discord-py-interactions"
from dotenv import load_dotenv
from os import getenv

load_dotenv()

TOKEN = getenv('DISCORD_TOKEN')
GUILD = getenv('DISCORD_GUILD')

bot = interactions.Client(token=TOKEN)

@bot.command(
    name="testing",
    description="this is a test command")
async def my_first_command(ctx: interactions.CommandContext):
    await ctx.send("This is a test")

bot.start()


"""
@bot.event #login scrumpt
async def on_ready():
    print('{0.user} is now watching for memes in #general'.format(bot))
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="You sleep"))

@bot.event
async def on_message(message): #anti offline

    global mutetime
    global inviswarns

    try: mutetime[f"{message.author.name}"]
    except: mutetime[f"{message.author.name}"] = {"time": 0, "length": 0, "repeats": 0}

    try: inviswarns[f"{message.author.name}"]
    except: inviswarns[f"{message.author.name}"] = 0

    if message.author == bot.user: #checks if the message author is itself
        return

    if mutetime[f"{message.author.name}"]["time"] != 0: #mute checks
        if (time.time() - mutetime[f"{message.author.name}"]["time"]) > (60 * mutetime[f"{message.author.name}"]["length"]):
            inviswarns[f"{message.author.name}"] = 3

            mutetime[f"{message.author.name}"]["repeats"] += 1
            mutetime[f"{message.author.name}"]["time"] = 0

        elif (time.time() - mutetime[f"{message.author.name}"]["time"]) < (60 * mutetime[f"{message.author.name}"]["length"]):
            temptime = (30 * 60 - (time.time() - mutetime[f"{message.author.name}"]["time"])) / 60
            #temptime = round(temptime * 10) / 10
            temptime = round(temptime)
            await message.reply(f"**{message.author.name}** You're muted for another {temptime} minutes kitten...", delete_after=2)
            await message.delete()
            return

    if message.author.status == discord.Status.offline: #invisible mode checks
        inviswarns[f"{message.author.name}"] += 1

        #await message.reply("{}".format(inviswarns[f"{message.author.name}"])) #Testing the amount of warnings

        if inviswarns[message.author.name] == 1:
            await message.reply(f"**{message.author.name}** Get out of invisible mode to speak.", delete_after=2)

        if inviswarns[message.author.name] == 2:
            await message.reply(f"**{message.author.name}** Get your disgusting invisible mode out of here.", delete_after=2)

        if inviswarns[message.author.name] == 3:
            await message.reply(f"**{message.author.name}** Hey buddy if you try to speak again in invisible mode its a 30m mute for you.".format(), delete_after=3)

        if inviswarns[message.author.name] == 4:
            await message.reply(f"**{message.author.name} you are now muted for 30 minutes for being in invisible mode.**", delete_after=2)
            mutetime[message.author.name] = {"time": time.time(), "length": (30 *(mutetime[f"{message.author.name}"]["repeats"] + 1))}
        await message.delete()

    if weirdcheck(message):
        await message.reply(f"**{message.author.name}** No weird characters in your message kitten :3", delete_after=3)
        await message.delete()

    if swearcheck(message):
        await message.reply(f"**{message.author.name}** Racism is not pogchamp.", delete_after=4)
        await message.delete()

    await bot.process_commands(message)

bot.start()

"""
"""
time.sleep(10)
print("SAVING VARIABLES")
for i in inviswarns:
    if i > 1:
        i += -1
with open("variables.txt", 'rb') as varfile:
    pickle.dump((inviswarns, mutetime), varfile)

while True:
    time.sleep(120)
    print("SAVING VARIABLES")
    for i in inviswarns:
        if i > 1:
            i += -1
    with open("variables.txt", 'rb') as varfile:
        pickle.dump((inviswarns, mutetime), varfile)
"""
