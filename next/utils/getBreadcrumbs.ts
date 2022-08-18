import { NavigationItemFragment } from '../graphql'
import { getSlugsForNavFiltering } from './getSlugsForNavFiltering'
import { TBreadcrumbListItem } from './types'

export const getBreadcrumbs = (slug: string, navigation: NavigationItemFragment[]) => {
  const slugs = getSlugsForNavFiltering(slug)
  const breadcrumbs: TBreadcrumbListItem[] = []

  let desiredChild: NavigationItemFragment | null = null
  slugs.forEach((slugPart, index) => {
    desiredChild =
      index === 0
        ? navigation.find((navItem) => navItem.path === slugs[0]) || null
        : desiredChild?.items?.find((navItem) => navItem?.path === slugPart) ?? null
    if (desiredChild) {
      breadcrumbs.push({ label: desiredChild.title, link: desiredChild?.path })
    }
  })

  return breadcrumbs
}
