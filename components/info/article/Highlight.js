import { v4 as uuid } from 'uuid'
import TeX from './TeX'

export default function Highlight({ tex }) {
  return (
    <div className='py-[20px] px-[40px] flex flex-col gap-5'>
      {tex.split('||||').map(row => (
        <div key={uuid()} className='flex justify-center gap-[30px]'>
          {row.split('|||').map(item => (
            <TeX key={uuid()} tex={item} />
          ))}
        </div>
      ))}
    </div>
  )
}