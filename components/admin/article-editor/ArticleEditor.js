import Input from '@/components/_common_/Input'

export default function ArticleEditor({ copy, setCopy, authors }) {
  function handleChange() {
    
  }

  const labelStyle ='self-start mt-[10px] text-neutral-400'

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
        onChange={handleChange}
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
        onChange={handleChange}
      />
      {/* <label className={labelStyle}>
        Category
      </label>
      <Input
        name='category'
        type='text'
        value={copy.category}
        onChange={handleChange}
      /> */}
      <label className={labelStyle}>
        Difficulty
      </label>
      <select
        name='difficultyLevel'
        className='appearance-none'
        value={String(copy.difficultyLevel)}
        onChange={handleChange}
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
        onChange={handleChange}
      />
      <label className={labelStyle}>
        Author
      </label>
      <select
        name='authorId'
        className='appearance-none'
        value={copy.authorId}
        onChange={handleChange}
      >
        {authors.map(author => (
          <option key={'author' + author.id} value={String(author.id)}>
            {author.username}
          </option>
        ))}
      </select>
      <label className={labelStyle}>
        Status
      </label>
      <select
        name='isPublished'
        className='appearance-none'
        value={copy.isPublished}
        onChange={handleChange}
      >
        <option value='1'>Published</option>
        <option value='0'>Unpublished</option>
      </select>
      <label className={labelStyle}>
        Image URL
      </label>
      <Input
        name='imageUrl'
        type='text'
        value={copy.imageUrl}
        onChange={handleChange}
      />
      <label className={labelStyle}>
        Content
      </label>
      <textarea
        name='content'
        className='resize-none'
        rows={22}
        spellCheck={false}
        value={copy.content}
        onChange={handleChange}
      />
    </div>
  )
}