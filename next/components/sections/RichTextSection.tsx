import { ComponentSectionsRichtext } from '../../graphql'
import RichText from '../atoms/RichText/RichText'
import Section, { SectionProps } from '../molecules/Section'

type RichTextSectionProps = Pick<SectionProps, 'isContainer' | 'color'> & {
  content: ComponentSectionsRichtext['content']
}

/*
  TODO: Richtext contains button option, how to implement it?
 */
const RichTextSection = ({ content, ...rest }: RichTextSectionProps) => {
  return (
    <Section {...rest}>
      <RichText data={content} />
    </Section>
  )
}

export default RichTextSection
