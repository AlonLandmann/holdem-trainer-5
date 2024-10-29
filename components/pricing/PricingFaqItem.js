import { useState } from 'react'

export default function PricingFaqItem({ question, answer }) {
  const [answerInView, setAnswerInView] = useState(false)

  return (
    <div className='max-w-[640px]'>
      <div
        className='flex mb-2 gap-2 text-lg text-neutral-500 cursor-pointer transition hover:text-neutral-400'
        onClick={() => { setAnswerInView(prev => !prev) }}
      >
        {answerInView
          ? <i className='bi bi-chevron-down'></i>
          : <i className='bi bi-chevron-right'></i>
        }
        <div>
          {question}
        </div>
      </div>
      {answerInView &&
        <div className='px-4 leading-6'>
          {answer}
        </div>
      }
    </div>
  )
}