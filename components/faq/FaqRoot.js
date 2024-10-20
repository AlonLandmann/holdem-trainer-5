import SupportFaqItem from '../faq/SupportFaqItem'
import Link from 'next/link'
import Button from '../_ui/Button'
import { getMilitaryRank, rankScoresSorted } from '@/lib/stats'
import RankBanner from '../overview/RankBanner'
import { withSeparators } from '@/lib/display'
import { useState } from 'react'
import EditorHotkeys from '../editor/EditorHotkeys'
import SupportNavbar from '../_layout/SupportNavbar'
import InfoLayout from '../_layout/InfoLayout'

export default function FaqRoot() {
  const [viewHotkeyInfo, setViewHotkeyInfo] = useState(false)

  return (
    <InfoLayout>
      {viewHotkeyInfo &&
        <EditorHotkeys
          user={{ settings: { hotkeyInfoDismissed: true } }}
          setUser={null}
          setViewHotkeyInfo={setViewHotkeyInfo}
        />
      }
      <div className='py-5 px-10'>
        <SupportNavbar />
        <div className='max-w-[800px] mx-auto'>
          <h1 className='text-2xl text-neutral-500 mb-5'>
            FAQ
          </h1>
          <div className='flex flex-col gap-10'>
            <SupportFaqItem question="Why should I use Hold'em Trainer?">
              Hold'em Trainer allows you to build your basic poker game step by step.
              The manager let's you gain an overview over your strategies pre- and post-flop,
              and the trainer allows you to drill as many hands as you want in any given spot.
              This is a much more efficient way to let the correct decisions become second nature,
              especially for the more uncommon scenarios. Playing live gets you 30 hands per hour at best,
              and while playing online let's you see more hands, it doesn't let you choose
              the area of the game you'd like to work on, and it also doesn't provide immediate feedback.
              With Hold'em Trainer you can train whatever you like, however often you like.
            </SupportFaqItem>
            <SupportFaqItem question="How do I use Hold'em Trainer effectively?">
              One effective way to use Hold'em Trainer is the following.
              First choose an area of the game you'd like to focus on, preferably a scenario that is either a first decision
              in a hand, or one that builds on another decision, which you are already comfortable with.
              Once chosen, build a few ranges of how you would like to play in those scenarios, or have a look at the Hold'em Academy
              to check whether we have already built some sample ranges for the scenarios in question.
              Study and tweak the ranges to your liking, you can also use solvers to optimize them in this step.
              Finally, spend a few days to drill these spots until they become more or less second nature to you.
              Afterwords, you can move on to conquer new areas of the game, but it might be useful to come back to the older ranges
              once in a while to keep them fresh.
            </SupportFaqItem>
            <SupportFaqItem question='When might it be useful to upgrade to a paid subscription?'>
              Hold'em Trainer is free for anyone to use and try out. Our HT-Basic tier let's you manage up to 20 ranges freely.
              However, if you are enjoying the process and would like to train more areas of your game, you can consider upgrading
              to the HT-Pro tier, which gives you the freedom to manage up to 100 ranges. If you desire still more, the HT-Elite
              tier offers unlimited access. Both the Pro and Elite tiers also allow you train more than four ranges at once in a single
              training session, and they give you full access to duplicate curated ranges from all Hold'em Academy articles.
              You can learn more about the HT-Pro and HT-Elite tiers <Link href='/pricing' className='text-neutral-400 hover:text-neutral-500'>here</Link>.
            </SupportFaqItem>
            <SupportFaqItem question="I am new to poker, is Hold'em Trainer for me?">
              Certainly. Hold'em Trainer is for anyone who aspires to learn more and become better at this great game.
              If you are new to the game it might benefit you to read some of the beginner articles at the Hold'em Academy.
              Some of these articles contain curated ranges that you may duplicate to start training the most common situations that
              arise in poker. You can also check out our YouTube channel, as well as our X and Discord communities for additional
              resources and support. Of course, there is also plenty of other content out there from other creators.
              You can use Hold'em Trainer to try and internalize and solidify the things you learn. The great thing is that it gives
              you full flexibility of designing your ranges. This means you can build simple ranges to start with, whereas some other
              services will try to get you to play perfectly from the start, which can often be overwhelming. With Hold'em Trainer,
              you can approach your understanding the game methodically, and at your own pace.
            </SupportFaqItem>
            <SupportFaqItem question='Setting up ranges seems difficult and time consuming, is there a faster way?'>
              First, make sure you are using the
              <Button
                theme='link'
                utilClasses='text-neutral-400 hover:text-neutral-500 mx-1'
                icon='alt'
                text='essential hotkeys'
                onClick={() => { setViewHotkeyInfo(true) }}
              />
              that are available for building ranges quickly.
              Second, make sure you utilize the + and - buttons available in the hand categories panel of the editor to quickly select and filter out related combos.
              Finally, there are many curated ranges available in Hold'em Academy articles that you can duplicate and adjust as you desire.
            </SupportFaqItem>
            <SupportFaqItem question='What is the purpose of linking ranges via the predecessor relation?'>
              The main purpose of linking ranges is to make sure that you only train the hole cards that you will actually hold in any given scenario.
              For example, if you never decide to open raise A6 from under the gun, then A6 should not appear in the range where you are defending
              your opening raise against a 3-bet. To this end, you can link your vs-3-bet range to your UTG open range, and Hold'em Trainer
              will automatically adjust the frequencies of each hole card to match the frequency with which the relevant action was chosen.
              You will also be notified when making changes to ranges that other ranges depend on, so that you can keep your ranges in sync with each other.
            </SupportFaqItem>
            <SupportFaqItem question='How am I supposed to train with the random number generator?'>
              Hold'em Trainer is meant to help you to get to the highest level of playing poker. And mixed strategies (taking action A some of the time and action B some of the time)
              are an essential part to maintaining balanced ranges that cannot be exploited. The random number generator (RNG) in the training screen will
              give you a number between 0.1 and 100.0. In your range, if you have selected three options, (let's say fold, call, and raising to 2.5 bb),
              and you have assigned each action the following frequences: 40 % fold, 30 % call, 30 % raise, then the RNG works as follows.
              When it shows a number between 0.1 and 40.0 you are supposed to fold, when it shows a number from 40.1 to 70.0 you are supposed to call,
              and when it shows a number between 70.1 and 100.0 you are supposed to raise.
            </SupportFaqItem>
            <SupportFaqItem question='If we cannot play with a random number generator in live games, why train with one?'>
              In Game Theory Optimal play, mixing your strategies with certain hands is unavoidable and often essential.
              It is true that playing live, it is not easy to simulate completely random play. However, it is still better to know
              what your expected actions should be in a given scenario. You can then apply the reads you have on other players,
              factor in your own table image, or find some other process to help you decide on the particular action you want to take.
              Once you know the expected way to mix up your play, you can exploit more easily and with intent, all while maintaining balanced ranges.
            </SupportFaqItem>
            <SupportFaqItem question='How are the points earned after a training session calculated?'>
              Hold'em Trainer assigns each of your ranges a complexity score between zero and one.
              For instance, a completely blank range where every hand chooses the same action 100% of the time
              will get a complexity score of zero, and training it will not earn you any points. A fairly complex range
              where there are a lot of different strategies with different frequencies being used by different combos
              will typically have a complexity score between 0.3 and 0.6. Only very chaotic ranges tend to get higher scores.
              Whenever you train a certain hand correctly, your training score will be increased exactly by the complexity of the range.
              To give an example, let's say you are training a range with complexity 0.25 for 100 hands, and answer 96 of the hands correctly.
              The training score for this session would then be 96 x 0.25 = 24.
            </SupportFaqItem>
            <div id='ranks'>
              <SupportFaqItem question='How does the ranking system work?'>
                Based on your total training score you are promoted through the following ranks. Your rank will be visible
                on your player profile as well as on the global leaderboards.
                <div className='flex flex-col gap-2 p-3 w-fit my-4'>
                  {rankScoresSorted.map(score => (
                    <div key={'score' + score} className='grid grid-cols-2 gap-3 items-center'>
                      <div className='text-center'>
                        {withSeparators(score)}
                      </div>
                      <RankBanner
                        rank={getMilitaryRank(score)}
                        withName
                      />
                    </div>
                  ))}
                </div>
              </SupportFaqItem>
            </div>
          </div>
        </div>
      </div>
    </InfoLayout>
  )
}