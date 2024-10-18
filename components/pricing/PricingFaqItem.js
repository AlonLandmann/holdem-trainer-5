import { useState } from 'react'

export default function PricingFaqItem({ question, answer }) {
  const [answerInView, setAnswerInView] = useState(false)

  return (
    <div
      className='w-[800px]'
      onClick={() => { setAnswerInView(prev => !prev) }}
    >
      <div className='flex'>
        {answerInView
          ? <i className='bi bi-chevron-down'></i>
          : <i className='bi bi-chevron-right'></i>
        }
        <div>
          {question}
        </div>
      </div>
      {answerInView &&
        <div>
          {answer}
        </div>
      }
    </div>
  )
}