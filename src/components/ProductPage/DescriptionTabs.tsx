import { Fragment, ReactNode, useState } from 'react'

type TabProps = {
  title: string
  content: ReactNode
}

interface IDescriptionTabs {
  tabs: TabProps[]
}

export const DescriptionTabs = ({ tabs }: IDescriptionTabs) => {
  const [currentTab, setCurrentTab] = useState<string>('Description')
  return (
    <div role='tablist' className='tabs tabs-bordered'>
      {tabs.map((tab: TabProps) => (
        <Fragment key={tab.title}>
          <input
            type='radio'
            name='description-tabs'
            role='tab'
            className='tab'
            aria-label={tab.title}
            checked={tab.title === currentTab}
            onChange={() => setCurrentTab(tab.title)} />
          <div role='tabpanel' className='tab-content p-2.5 font-light'>
            {tab.content}
          </div>
        </Fragment>
      ))}
    </div>
  )
}