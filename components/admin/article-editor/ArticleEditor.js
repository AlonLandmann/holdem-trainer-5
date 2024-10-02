import Input from '@/components/_common_/Input'

export default function ArticleEditor({ copy, setCopy }) {
  function handleChange() {

  }

  return (
    <div className='sticky top-0 overflow-y-auto max-h-screen flex flex-col gap-[10px] p-5'>
      <label>Title</label>
      <Input
        name='title'
        type='text'
        value={copy.title}
        onChange={handleChange}
      />
      <div className='px-[11px] pb-[10px] text-sm text-neutral-500'>
        {copy.slug}
      </div>
      <label>Category</label>
      <Input
        name='category'
        type='text'
        value={copy.category}
        onChange={handleChange}
      />
      <label>Author</label>
      <Input
        name='author'
        type='text'
        value={copy.author.username}
        onChange={handleChange}
      />
      <label>Publication Status</label>
      <select
        name='isPublished'
        className='appearance-none'
        value={copy.isPublished}
        onChange={handleChange}
      >
        <option value='1'>Yes</option>
        <option value='0'>No</option>
      </select>
      <label>Abstract</label>
      <textarea
        name='abstract'
        className='resize-none'
        rows={3}
        spellCheck={false}
        value={copy.abstract}
        onChange={handleChange}
      />
      <label>Difficulty</label>
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
      <label>Time to read</label>
      <Input
        name='readTime'
        type='number'
        value={copy.readTime}
        onChange={handleChange}
      />
      <label>Image URL</label>
      <Input
        name='imageUrl'
        type='text'
        value={copy.imageUrl}
        onChange={handleChange}
      />
      <label>Content</label>
      <textarea
        name='content'
        className='resize-none'
        rows={18}
        spellCheck={false}
        value={copy.content}
        onChange={handleChange}
      />
    </div>
  )
}