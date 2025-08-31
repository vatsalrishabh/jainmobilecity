import React from 'react'

interface Props {
  rightComponent: JSX.Element
}

const RightSideDisplay: React.FC<Props> = ({ rightComponent }) => {
  return (
    <div className='p-4'>
      {rightComponent}
    </div>
  )
}

export default RightSideDisplay
