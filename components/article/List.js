import { v4 as uuid } from 'uuid'
import TeX from './TeX'

export default function List({ tex }) {
  return (
    <div className='py-[20px] px-[15px] flex flex-col gap-[15px]'>
      {tex.split('__').map(item => (
        <div key={uuid()} className='flex items-center gap-[15px] text-left'>
          <i className='bi bi-circle-fill text-[4px]'></i>
          <TeX tex={item} />
        </div>
      ))}
    </div>
  )
}