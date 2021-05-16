from raw_words import raw_words
import json


words = []


for raw_word in raw_words:
  word_object = {}
  word = raw_word.split("=")[1].split("∑")
  word_object["word"] = word
  word_object["syllables"] = str(len(word))
  word_object["stressed"] = str(0)

  words.append(word_object)


with open('word-list.json', 'w') as fout:
    json.dump(words, fout)
