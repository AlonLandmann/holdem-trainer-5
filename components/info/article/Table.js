import { v4 as uuid } from 'uuid'
import TeX from './TeX'

export default function Table({ tex }) {
  const rawRows = tex.split('_')
  const rows = []

  for (let i = 0; i < rawRows.length; i++) {
    if (rawRows[i + 1] === '') {
      rows.push({ tex: rawRows[i], borderBottom: true })
      i++
    } else {
      rows.push({ tex: rawRows[i], borderBottom: false })
    }
  }

  const rawTable = rows.map(row => row.tex.split('|'))
  const table = []

  for (let i = 0; i < rawTable.length; i++) {
    const row = []

    for (let j = 0; j < rawTable[i].length; j++) {
      let cell = { tex: rawTable[i][j], borderBottom: rows[i].borderBottom }
      let skip = 0

      if (rawTable[i][j + 1] === '') {
        cell.borderRight = true
        skip++
      } else if (/col(\d)+/.test(rawTable[i][j + 1])) {
        cell.colSpan = Number(rawTable[i][j + 1].match(/(\d)+/)[0])
        skip++

        if (rawTable[i][j + 2] === '') {
          cell.borderRight = true
          skip++
        }
      }

      row.push(cell)
      j += skip
    }

    table.push(row)
  }

  return (
    <table className='p-2' cellSpacing={0}>
      <tbody>
        {table.map(row => (
          <tr key={uuid()}>
            {row.map(cell => (
              <td
                key={uuid()}
                className='py-[5px] px-[10px] text-center'
                style={{
                  borderBottom: cell.borderBottom ? '1px solid #999' : undefined,
                  borderRight: cell.borderRight ? '1px solid #999' : undefined
                }}
                colSpan={cell.colSpan || 1}
              >
                <TeX tex={cell.tex} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}