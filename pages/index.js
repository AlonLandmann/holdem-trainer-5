import Page from '@/components/_layout/Page'
import HomeRoot from '@/components/home/HomeRoot'
import prisma from '@/lib/prisma'
import { toClientFormat } from '@/lib/ranges'
import Link from 'next/link'

export default function HomePage({ ranges, usageInfo, articles }) {
  return (
    <Page title="Hold'em Trainer">
      <div className='bg-neutral-900 min-h-screen flex justify-center items-center'>
        <div className='max-w-[500px] text-lg'>
          We are currently in the process of updating the website. The new version should be live within 24 hours.
          You can try to access the service directly by navigating to <Link href='/auth/signup'>https://www.holdem-trainer/auth/signup</Link>.
          Otherwise you can reach out directly to us at info@holdem-trainer.com for a prompt response. Please bear with us.
        </div>
      </div>
    </Page>
  )
}