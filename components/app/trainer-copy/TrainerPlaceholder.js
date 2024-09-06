import css from '@/styles/trainer/TrainerPlaceholder.module.scss'
import Button from '../_common_/Button'

export default function TrainerPlaceholder({ notLoaded, noRanges, nothingSelected }) {
  return (
    <div className={css.container}>
      {notLoaded &&
        <div className={css.loaderContainer}>
          <div className={css.loader} />
          <div className={css.loaderText}>
            Loading ranges...
          </div>
        </div>
      }
      {!notLoaded && noRanges &&
        <>
          <div className={css.icon}>
            <i className='bi bi-inbox-fill'></i>
          </div>
          <h3 className={css.heading}>
            No ranges yet.
          </h3>
          <p className={css.body}>
            Click on the button below to manage your ranges.
          </p>
          <Button
            theme='border'
            icon='ui-checks'
            text='range manager'
            onClick={() => { window.location = '/ranges' }}
          />
        </>
      }
      {(!notLoaded && !noRanges && nothingSelected) &&
        <>
          <div className={css.icon}>
            <i className='bi bi-layout-sidebar-inset'></i>
          </div>
          <h3 className={css.heading}>
            No range selected.
          </h3>
          <p className={css.body}>
            Click on the ranges in the sidebar to select them for training.
          </p>
        </>
      }
    </div>
  )
}