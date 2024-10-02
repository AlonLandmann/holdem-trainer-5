import css from '@/styles/articles/ArticlesToolbar.module.scss'
import Button from '../_common_/Button'
import { useUser } from '@/hooks/useUser'

export default function ArticlesToolbar({
  categories,
  category,
  setCategory,
  bookmarked,
  setBookmarked,
  searchString,
  setSearchString
}) {
  const [user] = useUser()

  return (
    <div className={css.container}>
      <div className={css.separator} />
      <div className={css.categories}>
        {categories.map(c => (
          <div key={c} className={css[c == category ? 'categorySelected' : 'category']}>
            <Button
              theme='borderless'
              text={c}
              onClick={() => { setCategory(c) }}
            />
          </div>
        ))}
      </div>
      <div className={css.rightMenu}>
        <div className={css.searchbar}>
          <input
            className={css.searchInput}
            type='text'
            value={searchString}
            onChange={(e) => { setSearchString(e.target.value) }}
          />
          <div className={css.searchIcon}>
            <i className='bi bi-search'></i>
          </div>
        </div>
        <Button
          theme='border'
          icon={bookmarked ? 'bookmark-fill' : 'bookmark'}
          tooltip='filter bookmarked'
          onClick={() => { setBookmarked(prev => !prev) }}
        />
        {(user && user.isAdmin) &&
          <Button
            theme='border'
            icon='pen'
            tooltip='editor'
            onClick={() => { window.location = '/articles/editor' }}
          />
        }
      </div>
      <div className={css.separator} />
    </div>
  )
}