import Divider from '@components/atoms/Divider'
import { customImageLoader } from '@components/atoms/MImage'
import MLink from '@components/atoms/MLink'
import NormalizeText from '@components/atoms/NormalizeText/NormalizeText'
import cx from 'classnames'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { LiProps } from 'react-markdown/lib/ast-to-react'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

export interface RichTextProps {
  className?: string
  content?: string | null
  coloredTable?: boolean
}

export type AdvancedListItemProps = LiProps & { depth?: number }

const RichText = ({ className, content, coloredTable = true }: RichTextProps) => {
  return (
    <ReactMarkdown
      className={cx('flex flex-col gap-8', className)}
      components={{
        h1: ({ children }) => <h1 className="text-h1 font-bold">{children}</h1>,
        h2: ({ children }) => <h2 className="text-h2 font-bold">{children}</h2>,
        h3: ({ children }) => <h3 className="text-h3 font-bold">{children}</h3>,
        h4: ({ children }) => <h4 className="text-h4 font-bold">{children}</h4>,
        h5: ({ children }) => <h5 className="text-h5 font-bold">{children}</h5>,
        h6: ({ children }) => <h6 className="text-h6 font-bold">{children}</h6>,
        img: (props) => {
          // Strapi inserts image in markdown like this: ![alt||caption](url)
          // thank to patch located in patches/@strapi+admin+4.3.8.patch
          // So here we are extracting alt and caption.
          // If there is no || symbols then whole alt is used for both properties.
          const { alt: altAndCaption = '||', src } = props
          const [alt, caption] = altAndCaption.includes('||')
            ? altAndCaption.split('||')
            : [altAndCaption, altAndCaption]
          return (
            <figure className="flex flex-col gap-4">
              {/* https://stackoverflow.com/a/73618982 */}
              <Image
                src={src as string}
                width="0"
                height="0"
                className="w-full"
                alt={alt}
                sizes="100vw"
                loader={customImageLoader}
              />
              <figcaption className="text-center text-sm">{caption}</figcaption>
            </figure>
          )
        },
        p: ({ children, ...props }) => (
          <p className="whitespace-pre-wrap" {...props}>
            {children.map((child, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <NormalizeText key={index}>{child}</NormalizeText>
            ))}
          </p>
        ),
        a: ({ href, children }) => {
          const isExternal = href?.startsWith('http')
          return (
            <MLink href={href ?? '#'} target={isExternal ? '_blank' : '_self'} variant="regular">
              {children[0]}
              {isExternal && ' ↗'}
            </MLink>
          )
        },
        blockquote: ({ children, ...props }) => (
          <blockquote {...props} className="border-l-4 border-primary bg-white p-6 md:p-8">
            {children}
          </blockquote>
        ),
        table: ({ children, ...props }) => (
          <table {...props} className={cx('m-table', { colored: coloredTable })}>
            {children}
          </table>
        ),
        thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
        tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
        tr: ({ children, isHeader, ...props }) => <tr {...props}>{children}</tr>,
        td: ({ children, isHeader, ...props }) => (
          <td>
            <div {...props}>
              {children.map((child, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <NormalizeText key={index}>{child}</NormalizeText>
              ))}
            </div>
          </td>
        ),
        ol: ({ children, ordered, ...props }) => (
          <ol className="list-decimal pl-8 marker:text-primary" {...props}>
            {children}
          </ol>
        ),
        ul: ({ children, ordered, ...props }) => (
          <ul className="list-disc pl-8 marker:text-primary" {...props}>
            {children}
          </ul>
        ),
        li: ({ children, ordered, ...props }) => <li {...props}>{children}</li>,
        hr: () => <Divider />,
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content ?? ''}
    </ReactMarkdown>
  )
}

export default RichText
