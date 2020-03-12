import random

# Generate random path to check performance in huge input

# command_length = random.randint(1, 10000)
command_length = 10000

current_x = random.randint(-100000, 100000)
current_y = random.randint(-100000, 100000)

with open('input-generated.txt', 'w') as the_file:
    the_file.write('%d\n' % (command_length))
    the_file.write('%d %d\n' % (current_x, current_y))
    for i in range(command_length):
        the_file.write('%s %d\n' % (
                random.choice(['N', 'S', 'W', 'E']),
                random.randint(-100000, 100000)
            )
        )