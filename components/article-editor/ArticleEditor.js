import Button from '@/components/_ui/Button'
import Input from '@/components/_ui/Input'
import { produce } from 'immer'
import { kebabCase } from 'lodash'
import toast from 'react-hot-toast'

export default function ArticleEditor({ copy, setCopy }) {
  const labelStyle = 'self-start mt-[10px] text-neutral-400'

  function handleChange(event, modifier) {
    setCopy(produce(draft => {
      draft[event.target.name] = modifier(event.target.value)
    }))
  }

  async function handleSave() {
    const res = await fetch(`/api/articles/${copy.id}?secret=136f8eb61c1c78fca`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(copy)
    })

    const json = await res.json()

    if (json.success) {
      window.location = `/admin/article-editor/${kebabCase(copy.title)}`
    } else {
      toast.error(json.message || 'An unexpected error occurred.')
    }
  }

  return (
    <div
      className='self-start sticky top-0 overflow-y-auto max-h-screen grid gap-[10px] p-5'
      style={{ gridTemplateColumns: '100px 1fr' }}
    >
      <label className={labelStyle}>
        Title
      </label>
      <Input
        name='title'
        type='text'
        value={copy.title}
        onChange={e => { handleChange(e, value => value) }}
      />
      <label className={labelStyle}>
        Abstract
      </label>
      <textarea
        name='abstract'
        className='resize-none'
        rows={3}
        spellCheck={false}
        value={copy.abstract}
        onChange={e => { handleChange(e, value => value) }}
      />
      <label className={labelStyle}>
        Difficulty
      </label>
      <select
        name='level'
        className='appearance-none'
        value={String(copy.level)}
        onChange={e => { handleChange(e, value => Number(value)) }}
      >
        <option value='1'>Beginner</option>
        <option value='2'>Intermediate</option>
        <option value='3'>Advanced</option>
        <option value='4'>Expert</option>
      </select>
      <label className={labelStyle}>
        Time to read
      </label>
      <Input
        name='readTime'
        type='number'
        value={copy.readTime}
        onChange={e => { handleChange(e, value => Number(value)) }}
      />
      <label className={labelStyle}>
        Status
      </label>
      <select
        name='isPublished'
        className='appearance-none'
        value={copy.isPublished ? '1' : '0'}
        onChange={e => { handleChange(e, value => (value === '1')) }}
      >
        <option value='1'>Published</option>
        <option value='0'>Unpublished</option>
      </select>
      <label className={labelStyle}>
        Date
      </label>
      <Input
        name='publishedAt'
        type='text'
        value={copy.publishedAt}
        onChange={e => { handleChange(e, value => value) }}
      />
      <label className={labelStyle}>
        Image URL
      </label>
      <Input
        name='imageUrl'
        type='text'
        value={copy.imageUrl}
        onChange={e => { handleChange(e, value => value) }}
      />
      <label className={labelStyle}>
        Content
      </label>
      <textarea
        name='content'
        className='resize-none'
        rows={21}
        spellCheck={false}
        value={copy.content}
        onChange={e => { handleChange(e, value => value) }}
      />
      <label className={labelStyle}>
        Save
      </label>
      <Button
        theme='primary'
        utilClasses='py-3 px-4'
        text='Save Changes'
        onClick={handleSave}
        useQueue
      />
    </div>
  )
}