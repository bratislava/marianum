import { useId } from 'react'

import Button from '@/components/atoms/Button'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { CtaSectionFragment } from '@/graphql'
import { isDefined } from '@/utils/isDefined'

const getAriaLabelId = (id: string, index: number) => `ctagroup-${id}-${index}`

const CtaGroup = ({ ctas }: CtaSectionFragment) => {
  const { getFullPath } = useGetFullPath()

  const filteredCtas = ctas?.filter(isDefined)
  const id = useId()

  return (
    <div className="grid auto-cols-fr gap-6 md:grid-flow-col">
      {filteredCtas?.map(({ title, description, button }, index) => {
        const ctaSlug = getFullPath(button?.page?.data)

        return (
          <div
            className="relative flex flex-col bg-primary px-4 py-8 text-white md:p-12"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            <h3 className="font-bold text-current" id={getAriaLabelId(id, index)}>
              {title}
            </h3>
            <p className="mt-4 grow opacity-72">{description}</p>
            {ctaSlug && (
              <Button
                href={ctaSlug}
                className="mt-6 w-fit after:absolute after:inset-0"
                variant="white"
                aria-labelledby={getAriaLabelId(id, index)}
              >
                {button?.label}
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CtaGroup
