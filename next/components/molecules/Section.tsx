import classnames from 'classnames'
import React, { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  fullWidth?: boolean
  color?: 'default' | 'white'
}

const Section = ({ children, color = 'default', fullWidth = false }: SectionProps) => {
  return (
    <section
      className={classnames({ 'py-20': fullWidth, 'bg-white': color === 'white' && fullWidth })}
    >
      <div
        className={classnames({
          'container relative mx-auto px-4': fullWidth,
        })}
      >
        {children}
      </div>
    </section>
  )
}

export default Section
