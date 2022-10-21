import cx from 'classnames'
import { useRouter } from 'next/router'
import { Fragment, ReactNode } from 'react'

import ChevronRightIcon from '../../../assets/chevron_right.svg'
import OpenInNewIcon from '../../../assets/open_in_new.svg'
import PlaceIcon from '../../../assets/place.svg'
import { DocumentCategoryEntityFragment } from '../../../graphql'
import { onEnterOrSpaceKeyDown } from '../../../utils/onEnterOrSpaceKeyDown'
import Button from '../../atoms/Button'
import IconButton from '../../atoms/IconButton'
import MLink from '../../atoms/MLink'
import Tag from '../../atoms/Tag'

interface IRowProps {
  title: string
  metadata?: string[]
  tags?: string[]
  linkHref?: string
  isExternal?: boolean
  showUrl?: boolean
  category?: DocumentCategoryEntityFragment | null | undefined
  address?: string | null | undefined
  moreContent?: ReactNode
  button?: ReactNode
  arrowInCorner?: boolean
  border?: boolean
}

const Row = ({
  title,
  metadata,
  tags = [],
  linkHref,
  isExternal = false,
  showUrl = false,
  category,
  address,
  moreContent,
  button = null,
  arrowInCorner = false,
  border = true,
}: IRowProps) => {
  const router = useRouter()

  const linkProps = linkHref
    ? {
        role: 'link',
        tabIndex: -1,
        onClick: () => router.push(linkHref),
        onKeyDown: onEnterOrSpaceKeyDown(() => router.push(linkHref)),
      }
    : null

  return (
    <div
      {...linkProps}
      aria-label={title}
      className={cx('group relative flex w-full items-center bg-white py-3 px-4 md:py-4 md:px-5', {
        'cursor-pointer': linkHref,
        'border border-border': border,
      })}
    >
      <div className="grow space-y-1.5">
        {category?.attributes && (
          <MLink
            // TODO add proper link for category
            href="#"
            noStyles
            className="text-sm text-primary underline hover:text-primary-dark"
          >
            {category.attributes.title}
          </MLink>
        )}

        <div className="flex gap-4">
          <h5
            className={cx('w-fit text-left text-h5 text-foreground-heading', {
              'group-hover:underline group-focus:underline': linkHref,
            })}
          >
            {title}
          </h5>
          {tags.length > 0 &&
            tags.map((tag) => (
              <Tag key={tag} className="bg-background-beige">
                {tag}
              </Tag>
            ))}
        </div>

        <div className="space-x-3 text-sm empty:hidden">
          {showUrl && linkHref && (
            <>
              <span>{linkHref}</span>
              {metadata && metadata.length > 0 && <span>&bull;</span>}
            </>
          )}
          {metadata?.map((metadataItem, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={i}>
              <span>{metadataItem}</span>
              {i !== metadata.length - 1 && <span>•</span>}
            </Fragment>
          ))}
        </div>

        {address && (
          <div className="flex items-center gap-x-2">
            <span className="text-primary">
              <PlaceIcon />
            </span>
            {address}
          </div>
        )}

        {moreContent && <div className="pt-2 text-left">{moreContent}</div>}
      </div>

      <div className={cx('flex gap-x-5', { 'items-center': !arrowInCorner })}>
        {button && <div className="hidden md:flex">{button}</div>}
        {linkHref &&
          (isExternal ? (
            <>
              {/* desktop button */}
              <Button
                href={linkHref}
                variant="plain-secondary"
                startIcon={<OpenInNewIcon />}
                className="hidden md:flex"
              >
                {/* TODO translations */}
                Zobraziť web
              </Button>
              {/* mobile buttom */}
              <IconButton
                href={linkHref}
                aria-label={title}
                variant="plain-secondary"
                className="-mr-2 md:hidden"
              >
                <OpenInNewIcon />
              </IconButton>
            </>
          ) : (
            // eslint-disable-next-line jsx-a11y/tabindex-no-positive
            <IconButton href={linkHref} aria-label={title} className="-mr-2 hidden md:flex">
              <ChevronRightIcon />
            </IconButton>
          ))}
      </div>
    </div>
  )
}

export default Row
