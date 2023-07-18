import React from 'react'

const Title = ({children,addClass}) => {
  return (
    <div>
      <div className={addClass}>{children}</div>
    </div>
  )
}

export default Title
