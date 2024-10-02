import css from '@/styles/article-editor/ArticleEditorToolbar.module.scss'
import Button from '../_common_/Button'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ArticleEditorToolbar({ article, setArticle }) {
  async function handleSave() {
    const res = await axios.put(`/api/articles/${article.id}`, article)
    
    if (!res.data.success) {
      return toast.error('Error updating article.')
    }
    
    window.location = '/articles/editor'
  }

  return (
    <div className={css.container}>
      <div className={css.separator}></div>
      <div className={css.rightMenu}>
        <Button
          theme='border'
          icon='floppy'
          onClick={handleSave}
        />
      </div>
      <div className={css.separator}></div>
    </div>
  )
}