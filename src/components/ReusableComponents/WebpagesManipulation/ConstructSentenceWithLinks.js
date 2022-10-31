import React from 'react';
import { nanoid } from 'nanoid';

const ConstructSentenceWithLinks = ({sentence, words}) => {
  /** Props explanation:
   * sentence: A long String representing the text in which we will include the word and its link
   * words: Array of Objects in form: [{ id: "", word: "", link: "" }]
   * 
   * If "sentence" contains following characters -> [link] 
   * it means there's a place where we will insert the word having link on it
   * 
   * Down below, the sentence is split by [link], so that we end up with an Array of Strings
   * Then, we will construct an Object with form {sentence: "", word: "", link: "", id: ""}
   * Because the number of elements in "words" Array, is equal with the number of Strings after sentence is split.
   * 
   * We will return the 'modified' sentence in JSX if the length of "words" is greater than 0
   * Otherwise, we will just return the sentence as is from the props (because there are no words with links to add)
   */

  let spreadSentence;

  if (words.length !== 0) {
    spreadSentence = sentence.split('[link]')

    const sentenceWithWordLink = []
    for (let i = 0; i < spreadSentence.length; i++) {
      if (words[i]) {
        sentenceWithWordLink.push({
          sentence: spreadSentence[i],
          word: words[i].word,
          link: words[i].link,
          id: words[i].id
        })
      } else {
        sentenceWithWordLink.push({
          sentence: spreadSentence[i],
          word: "" ,
          link: "",
          id: nanoid(5)
        })
      }
    }

    spreadSentence = sentenceWithWordLink
  }

  return (
    <p className='text-center pe-4 ps-4 mb-0'>
      { words && words.length !== 0 ?
        <>
          {spreadSentence && spreadSentence.map(element => (
            <span key={element.id}>
              <span> {element.sentence} </span>
              <span>
                <a href={element.link} style={{textDecoration: 'none'}}> {element.word} </a>
              </span>
            </span>
            )
          )}
        </>
        :
        <span>
          {sentence}
        </span>
      }
    </p>
  )
}

export default ConstructSentenceWithLinks