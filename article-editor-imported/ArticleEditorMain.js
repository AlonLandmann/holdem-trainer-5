import css from '@/styles/article-editor/ArticleEditorMain.module.scss'
import Article from '../article/Article'
import { produce } from 'immer'
import { kebabCase } from 'lodash'
import Switch from '../_common_/Switch'

export default function ArticleEditorMain({ article, setArticle }) {
  function handleChange(e) {
    setArticle(produce(draft => {
      if (['difficultyLevel', 'readTime'].includes(e.target.name)) {
        draft[e.target.name] = Number(e.target.value)
      } else {
        draft[e.target.name] = e.target.value
      }

      if (e.target.name == 'title') {
        draft.slug = kebabCase(e.target.value)
      }
    }))
  }

  return !article ? null : (
    <div className={css.container}>
      <div className={css.editor}>
        <label>Title</label>
        <input
          name='title'
          type='text'
          value={article.title}
          onChange={handleChange}
        />
        <div className={css.slug}>
          {article.slug}
        </div>
        <label>Category</label>
        <input
          name='category'
          type='text'
          value={article.category}
          onChange={handleChange}
        />
        <label>Author</label>
        <input
          name='createdBy'
          type='text'
          value={article.createdBy}
          onChange={handleChange}
        />
        <label>Publication Status</label>
        <Switch
          state={article.isPublished}
          handleToggle={(value) => { setArticle(produce(draft => { draft.isPublished = value })) }}
          textLeft='Published'
          textRight='Not published'
        />
        <label>Abstract</label>
        <textarea
          name='abstract'
          rows={3}
          value={article.abstract}
          onChange={handleChange}
        />
        <label>Difficulty</label>
        <select
          name='difficultyLevel'
          value={article.difficultyLevel}
          onChange={handleChange}
        >
          <option value='1'>Beginner</option>
          <option value='2'>Intermediate</option>
          <option value='3'>Advanced</option>
          <option value='4'>Expert</option>
        </select>
        <label>Time to read</label>
        <input
          name='readTime'
          type='number'
          value={article.readTime}
          onChange={handleChange}
        />
        <label>Image URL</label>
        <input
          name='imageUrl'
          type='text'
          value={article.imageUrl}
          onChange={handleChange}
        />
        <label>Content</label>
        <textarea
          name='content'
          rows={18}
          value={article.content}
          onChange={handleChange}
        />
      </div>
      <Article article={article} />
    </div>
  )
}