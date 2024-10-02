import { v4 as uuid } from 'uuid'
import css from '@/styles/article/List.module.scss'
import TeX from './TeX'

export default function List({ tex }) {
  return (
    <div className={css.container}>
      {tex.split('__').map(item => (
        <div key={uuid()} className={css.item}>
          <i className='bi bi-circle-fill'></i>
          <TeX tex={item} />
        </div>
      ))}
    </div>
  )
}