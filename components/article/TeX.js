import Highlight from '@/components/article/Highlight'
import List from '@/components/article/List'
import RangeDisplayCard from '@/components/article/RangeDisplayCard'
import Table from '@/components/article/Table'
import Link from 'next/link'
import { InlineMath, BlockMath } from 'react-katex'
import { v4 as uuid } from 'uuid'
import 'katex/dist/katex.min.css'

export default function TeX({ tex }) {
  let parsed = []
  let mode = 'text'
  let main = ''

  const mathSplits = /^(=|<|>|\\neq|\\geq|\\leq)/
  const escapePattern = /^~(\[|\]|§|#|\$|\*|@|%|>|<|=|\\neq|\\geq|\\leq)/

  for (let i = 0; i <= tex.length; i += 1) {
    if (escapePattern.test(tex.slice(i))) {
      main = main.concat(tex[i + 1]);
      i += 1;
    } else if (mode === 'text') {
      if (i === tex.length) { pushText() }
      else if (/^\[\[/.test(tex.slice(i))) { pushText(); mode = 'blockMath'; i += 1 }
      else if (tex[i] === '[') { pushText(); mode = 'math' }
      else if (tex[i] === '§') { pushText(); mode = 'textRef' }
      else if (tex[i] === '#') { pushText(); mode = 'table' }
      else if (tex[i] === '$') { pushText(); mode = 'highlight' }
      else if (tex[i] === '>') { pushText(); mode = 'bold' }
      else if (tex[i] === '<') { pushText(); mode = 'italic' }
      else if (tex[i] === '*') { pushText(); mode = 'list' }
      else if (tex[i] === '@') { pushText(); mode = 'range' }
      else if (tex[i] === '%') { pushText(); pushNewLine() }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'textRef') {
      if (tex[i] === '§') { pushTextRef(); mode = 'text' }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'blockMath') {
      if (/^\]\]/.test(tex.slice(i))) { pushBlockMath(); mode = 'text'; i += 1 }
      else if (mathSplits.test(tex.slice(i))) { pushBlockMath(); pushSpacer(); main = tex[i] }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'math') {
      if (tex[i] === ']') { pushMath(); mode = 'text' }
      else if (mathSplits.test(tex.slice(i))) { pushMath(); pushSpacer(); main = tex[i] }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'table') {
      if (tex[i] === '#') { pushTable(); mode = 'text' }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'highlight') {
      if (tex[i] === '$') { pushHighlight(); mode = 'text' }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'bold') {
      if (tex[i] === '>') { pushBold(); mode = 'text' }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'italic') {
      if (tex[i] === '<') { pushItalic(); mode = 'text' }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'list') {
      if (tex[i] === '*') { pushList(); mode = 'text' }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'range') {
      if (tex[i] === '@') { pushRange(); mode = 'text' }
      else { main = main.concat(tex[i]) }
    }
  }

  function pushText() {
    parsed.push(
      <span key={uuid()}>{main}</span>
    )

    main = ''
  }

  function pushNewLine() {
    parsed.push(
      <div key={uuid()} style={{ height: '25px' }}></div>
    )
  }

  function pushTextRef() {
    let content, url

    if (main.split(',').length === 1) {
      content = main
      url = main
    } else {
      content = main.split(',')[0]
      url = main.split(',')[1]
    }

    parsed.push(
      <Link key={uuid()} href={url}>
        {content}
      </Link>
    )

    main = ''
  }

  function pushMath() {
    parsed.push(
      <InlineMath key={uuid()}>{main}</InlineMath>
    )

    main = ''
  }

  function pushBlockMath() {
    parsed.push(
      <div key={uuid()} style={{ display: 'inline-block' }}>
        <BlockMath>{main}</BlockMath>
      </div>
    )

    main = ''
  }

  function pushSpacer() {
    parsed.push(
      <span key={uuid()} style={{ marginRight: '0.2778em' }}></span>
    )
  }

  function pushTable() {
    parsed.push(
      <Table key={uuid()} tex={main} />
    )

    main = ''
  }

  function pushHighlight() {
    parsed.push(
      <Highlight key={uuid()} tex={main} />
    )

    main = ''
  }

  function pushBold() {
    parsed.push(
      <span key={uuid()} style={{ fontWeight: 'bold' }}>{main}</span>
    )

    main = ''
  }

  function pushItalic() {
    parsed.push(
      <span key={uuid()} style={{ fontStyle: 'italic' }}>{main}</span>
    )

    main = ''
  }

  function pushList() {
    parsed.push(
      <List key={uuid()} tex={main} />
    )

    main = ''
  }

  function pushRange() {
    parsed.push(
      <RangeDisplayCard rangeId={Number(main)} />
    )

    main = ''
  }

  return <div>{parsed}</div>
}