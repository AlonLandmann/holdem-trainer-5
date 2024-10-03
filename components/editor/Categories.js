import Button from '@/components/_ui/Button'
import Category from './Category'
import { categorize, categorizePreflop, retrieveInOrder, retrievePreflopInOrder } from '@/lib/categories'
import { produce } from 'immer'
import { useState } from 'react'

export default function Categories({ range, setSelected, setHovered }) {
  const [detailsInView, setDetailsInView] = useState({ '1pr': false, 'HC': false })
  const categories = (range.spot.street === 'preflop') ? categorizePreflop(range) : categorize(range)
  const total = categories.allStrats.reduce((acc, curr) => (acc + curr), 0)

  function getFraction(frequencyTotals) {
    const localTotal = frequencyTotals.reduce((acc, curr) => (acc + curr), 0)
    return localTotal / total
  }

  function getStrategy(frequencyTotals) {
    const localTotal = frequencyTotals.reduce((acc, curr) => (acc + curr), 0)
    return frequencyTotals.map(fT => (fT / localTotal))
  }

  function inOrder(type, strength) {
    if (range.spot.street === 'preflop') {
      return retrievePreflopInOrder(categories, type)
    } else {
      return retrieveInOrder(categories, type, strength)
    }
  }

  function handleToggleDetails(strength) {
    setDetailsInView(produce(draft => {
      draft[strength] = !draft[strength]
    }))
  }

  return (
    <div className='border rounded py-3 px-[18px] bg-neutral-[#202020] opacity-80'>
      {!range.spot.options &&
        <div className='h-[400px] w-[322px] flex justify-center items-center text-neutral-600'>
          non-trainable spot
        </div>
      }
      {range.spot.options &&
        <>
          <div className='pb-1 text-neutral-400'>
            Categories
          </div>
          <div
            className={range.spot.street !== 'preflop' ? 'grid gap-1' : ''}
            style={{ gridTemplateColumns: '1fr 30px' }}
          >
            <Category
              range={range}
              comboArray={categories.all}
              name='All'
              fraction={getFraction(categories.allStrats)}
              strategy={getStrategy(categories.allStrats)}
              setSelected={setSelected}
              setHovered={setHovered}
            />
          </div>
          <div className='pt-4 pb-1 text-neutral-400'>
            Strength
          </div>
          <div className='flex flex-col'>
            {inOrder('strengths').map(strength => (
              <div key={'strength' + strength}>
                <div
                  className={range.spot.street !== 'preflop' ? 'grid gap-1' : ''}
                  style={{ gridTemplateColumns: '1fr 30px' }}
                >
                  <Category
                    range={range}
                    comboArray={categories.strengths[strength]}
                    name={strength}
                    fraction={getFraction(categories.strengthStrats[strength])}
                    strategy={getStrategy(categories.strengthStrats[strength])}
                    setSelected={setSelected}
                    setHovered={setHovered}
                  />
                  {['1pr', 'HC'].includes(strength) &&
                    <Button
                      theme='tertiary'
                      icon={detailsInView[strength] ? 'chevron-down' : 'chevron-left'}
                      onClick={() => handleToggleDetails(strength)}
                    />
                  }
                </div>
                {detailsInView[strength] &&
                  <div className='flex flex-col mt-[2px] ml-4 mb-1 py-1'>
                    {inOrder('details', strength).map(detail => (
                      <div key={'detail' + strength + detail}>
                        <Category
                          range={range}
                          comboArray={categories.details[strength][detail]}
                          name={detail}
                          fraction={getFraction(categories.detailStrats[strength][detail])}
                          strategy={getStrategy(categories.detailStrats[strength][detail])}
                          setSelected={setSelected}
                          setHovered={setHovered}
                        />
                      </div>
                    ))}
                  </div>
                }
              </div>
            ))}
          </div>
          {(range.spot.street == 'preflop' || [3, 4].includes(range.spot.board.length)) &&
            <>
              <div className='pt-4 pb-1 text-neutral-400'>
                Draws
              </div>
              <div className='flex flex-col'>
                {inOrder('draws').map(draw => (
                  <div
                    key={'draw' + draw}
                    className={range.spot.street !== 'preflop' ? 'grid gap-1' : ''}
                    style={{ gridTemplateColumns: '1fr 30px' }}
                  >
                    <Category
                      range={range}
                      comboArray={categories.draws[draw]}
                      name={draw}
                      fraction={getFraction(categories.drawStrats[draw])}
                      strategy={getStrategy(categories.drawStrats[draw])}
                      setSelected={setSelected}
                      setHovered={setHovered}
                    />
                  </div>
                ))}
              </div>
            </>
          }
        </>
      }
    </div>
  )
}