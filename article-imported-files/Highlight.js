import { v4 as uuid } from 'uuid'
import css from '@/styles/article/Highlight.module.scss'
import TeX from './TeX'

export default function Highlight({ tex }) {
  return (
    <div className={css.container}>
      {tex.split('||||').map(row => (
        <div key={uuid()} className={css.row}>
          {row.split('|||').map(item => (
            <TeX key={uuid()} tex={item} />
          ))}
        </div>
      ))}
    </div>
  )
}