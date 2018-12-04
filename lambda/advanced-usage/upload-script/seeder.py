from random import choice, randint

filepath = '/usr/share/dict/words'
with open(filepath) as f:
    words = f.readlines()

sentences = (' '.join(choice(words).strip()
                for _ in range(randint(10, 30))) + '.' 
                    for _ in range(5))

for i, sentence in enumerate(sentences):
    filename = '{}.txt'.format(i)
    with open(filename, 'w') as f:
        f.write(sentence)
