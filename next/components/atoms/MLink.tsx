import { ArrowRightIcon } from '@assets/icons'
import { sendGTMEvent } from '@next/third-parties/google'
import cx from 'classnames'
import NextLink from 'next/link'
import { ComponentProps, forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type LinkProps = Omit<ComponentProps<typeof NextLink>, 'as' | 'passHref'> & {
  children: ReactNode
  variant?: 'primary' | 'white' | 'regular'
  noArrow?: boolean
  noStyles?: boolean
  className?: string
}

const MLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      prefetch,
      replace,
      scroll,
      shallow,
      locale,
      children,
      variant = 'primary',
      noArrow = false,
      noStyles = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const styles = twMerge(
      noStyles
        ? ''
        : cx({
            'inline-flex items-center justify-center space-x-2 text-center align-middle text-md font-bold':
              variant === 'primary' || variant === 'white',
            'text-primary hover:text-primary-dark': variant === 'primary',
            'text-white hover:opacity-64': variant === 'white',
            'font-semibold text-primary underline hover:text-primary-dark': variant === 'regular',
          }),
      className,
    )
    return (
      <NextLink
        href={href ?? ''}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
        ref={ref}
        passHref
        {...rest}
        className={styles}
        onClick={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Link clicked!')
            sendGTMEvent({ event: 'testingLinkClicked', value: 'testing' })
          }
        }}
      >
        {noStyles ? (
          children
        ) : (
          <>
            <span>{children}</span>
            {!noArrow && (
              <ArrowRightIcon className={variant === 'regular' ? 'inline' : undefined} />
            )}
          </>
        )}
      </NextLink>
    )
  },
)

export default MLink
