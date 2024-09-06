import css from '@/styles/trainer/Options.module.scss'
import Button from '../_common_/Button'
import { capitalize } from 'lodash'

export default function Options({ range, handleCheckAnswer }) {
  return (
    <div className={css.container}>
      {range.options.map((option, i) => (
        <div
          key={'option' + i}
          className={css.option}
        >
          <Button
            theme='withHotkey'
            hotkey={String(i + 1)}
            text={option.size ? `${option.size} bb` : capitalize(option.type)}
            onClick={() => { handleCheckAnswer(option) }}
          />
        </div>
      ))}
    </div>
  )
}
