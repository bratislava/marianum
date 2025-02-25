import type { Schema, Attribute } from '@strapi/strapi';

export interface BlocksAccordionItemWithPrice extends Schema.Component {
  collectionName: 'components_blocks_accordion_item_with_prices';
  info: {
    displayName: 'accordion item with price';
    icon: 'chevron-down';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    price: Attribute.Decimal;
    description: Attribute.RichText;
  };
}

export interface BlocksAccordionItem extends Schema.Component {
  collectionName: 'components_blocks_accordion_items';
  info: {
    displayName: 'accordion item';
    icon: 'chevron-down';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.RichText;
  };
}

export interface BlocksArticleItem extends Schema.Component {
  collectionName: 'components_blocks_article_items';
  info: {
    displayName: 'article item';
    icon: 'newspaper';
  };
  attributes: {
    article: Attribute.Relation<
      'blocks.article-item',
      'oneToOne',
      'api::article.article'
    >;
  };
}

export interface BlocksBlocksCeremonyArchiveBlock extends Schema.Component {
  collectionName: 'components_blocks_blocks_ceremony_archive_blocks';
  info: {
    displayName: 'blocks - ceremony archive block';
  };
  attributes: {
    title: Attribute.String;
    button: Attribute.Component<'blocks.button-link'>;
  };
}

export interface BlocksBranchItem extends Schema.Component {
  collectionName: 'components_blocks_branch_items';
  info: {
    displayName: 'branch item';
    icon: 'cross';
  };
  attributes: {
    branch: Attribute.Relation<
      'blocks.branch-item',
      'oneToOne',
      'api::branch.branch'
    >;
  };
}

export interface BlocksBundleContentItem extends Schema.Component {
  collectionName: 'components_blocks_bundle_content_items';
  info: {
    displayName: 'bundle content item';
    icon: 'check';
  };
  attributes: {
    description: Attribute.String & Attribute.Required;
  };
}

export interface BlocksBundleGroup extends Schema.Component {
  collectionName: 'components_blocks_bundle_groups';
  info: {
    displayName: 'bundle group';
    icon: 'gift';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    bundles: Attribute.Component<'blocks.bundle-item', true>;
  };
}

export interface BlocksBundleItem extends Schema.Component {
  collectionName: 'components_blocks_bundle_items';
  info: {
    displayName: 'bundle item';
    icon: 'gift';
  };
  attributes: {
    bundle: Attribute.Relation<
      'blocks.bundle-item',
      'oneToOne',
      'api::bundle.bundle'
    >;
  };
}

export interface BlocksButtonLink extends Schema.Component {
  collectionName: 'components_blocks_button_links';
  info: {
    displayName: 'button link';
    icon: 'arrow-right';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    page: Attribute.Relation<
      'blocks.button-link',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface BlocksContactItem extends Schema.Component {
  collectionName: 'components_blocks_contact_items';
  info: {
    displayName: 'contact item';
    icon: 'address-card';
  };
  attributes: {
    contact: Attribute.Relation<
      'blocks.contact-item',
      'oneToOne',
      'api::contact.contact'
    >;
  };
}

export interface BlocksCta extends Schema.Component {
  collectionName: 'components_blocks_ctas';
  info: {
    displayName: 'cta';
    icon: 'compress-arrows-alt';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    button: Attribute.Component<'blocks.button-link'>;
    image: Attribute.Media;
  };
}

export interface BlocksDocumentItem extends Schema.Component {
  collectionName: 'components_blocks_document_items';
  info: {
    displayName: 'document item';
    icon: 'file';
  };
  attributes: {
    document: Attribute.Relation<
      'blocks.document-item',
      'oneToOne',
      'api::document.document'
    >;
  };
}

export interface BlocksOfficeItem extends Schema.Component {
  collectionName: 'components_blocks_office_items';
  info: {
    displayName: 'office item';
    icon: 'house-damage';
  };
  attributes: {
    office: Attribute.Relation<
      'blocks.office-item',
      'oneToOne',
      'api::office.office'
    >;
  };
}

export interface BlocksOpeningHoursItem extends Schema.Component {
  collectionName: 'components_blocks_opening_hours_items';
  info: {
    displayName: 'opening hours item';
    icon: 'clock';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    time: Attribute.String;
  };
}

export interface BlocksOpeningHoursUniversal extends Schema.Component {
  collectionName: 'components_blocks_opening_hours_universals';
  info: {
    displayName: 'opening hours universal';
    icon: 'clock';
  };
  attributes: {
    days: Attribute.Component<'blocks.opening-hours-item', true>;
  };
}

export interface BlocksPageItem extends Schema.Component {
  collectionName: 'components_blocks_page_items';
  info: {
    displayName: 'page item';
    icon: 'passport';
  };
  attributes: {
    page: Attribute.Relation<'blocks.page-item', 'oneToOne', 'api::page.page'>;
  };
}

export interface BlocksPriceListItem extends Schema.Component {
  collectionName: 'components_blocks_price_list_items';
  info: {
    displayName: 'price list item';
    icon: 'list';
  };
  attributes: {
    label: Attribute.Text;
    price: Attribute.Decimal;
  };
}

export interface BlocksSidebar extends Schema.Component {
  collectionName: 'components_blocks_sidebars';
  info: {
    displayName: 'sidebar';
    icon: 'align-right';
  };
  attributes: {
    title: Attribute.Text;
    text: Attribute.Text;
    ctaButton: Attribute.Component<'blocks.button-link'>;
    contact: Attribute.Relation<
      'blocks.sidebar',
      'oneToOne',
      'api::contact.contact'
    >;
  };
}

export interface BlocksSimpleCtaItem extends Schema.Component {
  collectionName: 'components_blocks_simple_cta_items';
  info: {
    displayName: 'simple cta item';
    icon: 'bullhorn';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    button: Attribute.Component<'blocks.button-link'>;
  };
}

export interface BlocksSocialItem extends Schema.Component {
  collectionName: 'components_blocks_social_items';
  info: {
    displayName: 'social item';
    icon: 'globe-europe';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    icon: Attribute.Enumeration<
      ['facebook', 'instagram', 'youtube', 'linkedin', 'twitter']
    >;
  };
}

export interface GeneralContacts extends Schema.Component {
  collectionName: 'components_general_contacts';
  info: {
    displayName: 'contacts';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    addressFirstLine: Attribute.String;
    address: Attribute.Text;
    openingHoursPage: Attribute.Relation<
      'general.contacts',
      'oneToOne',
      'api::page.page'
    >;
    contact: Attribute.Relation<
      'general.contacts',
      'oneToOne',
      'api::contact.contact'
    >;
    contactsPage: Attribute.Relation<
      'general.contacts',
      'oneToOne',
      'api::page.page'
    >;
    latitude: Attribute.String;
    longitude: Attribute.String;
    navigateToLink: Attribute.String;
  };
}

export interface GeneralFooter extends Schema.Component {
  collectionName: 'components_general_footers';
  info: {
    displayName: 'footer';
    icon: 'columns';
    description: '';
  };
  attributes: {
    title1: Attribute.String;
    links1: Attribute.Component<'general.link-item', true>;
    title2: Attribute.String;
    links2: Attribute.Component<'general.link-item', true>;
    title3: Attribute.String;
    links3: Attribute.Component<'general.link-item', true>;
    title4: Attribute.String;
    links4: Attribute.Component<'general.link-item', true>;
    bottomLinks: Attribute.Component<'blocks.button-link', true> &
      Attribute.SetMinMax<{
        max: 2;
      }>;
  };
}

export interface GeneralHeader extends Schema.Component {
  collectionName: 'components_general_headers';
  info: {
    displayName: 'header';
    icon: 'heading';
    description: '';
  };
  attributes: {
    faqPage: Attribute.Relation<'general.header', 'oneToOne', 'api::page.page'>;
    contact: Attribute.Relation<
      'general.header',
      'oneToOne',
      'api::contact.contact'
    >;
  };
}

export interface GeneralLinkItem extends Schema.Component {
  collectionName: 'components_general_link_items';
  info: {
    displayName: 'link item';
    icon: 'link';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    page: Attribute.Relation<'general.link-item', 'oneToOne', 'api::page.page'>;
    url: Attribute.String;
    targetBlank: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface GeneralProcedureItem extends Schema.Component {
  collectionName: 'components_general_procedure_items';
  info: {
    displayName: 'procedure item';
    icon: 'check-circle';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
  };
}

export interface GeneralProcedure extends Schema.Component {
  collectionName: 'components_general_procedures';
  info: {
    displayName: 'procedure';
    icon: 'list-ol';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    steps: Attribute.Component<'general.procedure-item', true>;
    downloadFile: Attribute.Media;
  };
}

export interface GeneralSeo extends Schema.Component {
  collectionName: 'components_general_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String;
    keywords: Attribute.String;
    metaDescription: Attribute.Text;
  };
}

export interface GeneralSocial extends Schema.Component {
  collectionName: 'components_general_socials';
  info: {
    displayName: 'social';
    icon: 'globe';
  };
  attributes: {
    facebook: Attribute.String;
    instagram: Attribute.String;
    linkedin: Attribute.String;
    youtube: Attribute.String;
    twitter: Attribute.String;
  };
}

export interface SectionsAccordionGroup extends Schema.Component {
  collectionName: 'components_sections_accordion_groups';
  info: {
    displayName: 'accordion group';
    icon: 'chevron-down';
  };
  attributes: {
    title: Attribute.String;
    accordions: Attribute.Component<'blocks.accordion-item', true>;
  };
}

export interface SectionsArticleJobsListing extends Schema.Component {
  collectionName: 'components_sections_article_jobs_listings';
  info: {
    displayName: 'article jobs listing';
    icon: 'newspaper';
  };
  attributes: {};
}

export interface SectionsArticleNewsListing extends Schema.Component {
  collectionName: 'components_sections_article_news_listings';
  info: {
    displayName: 'article news listing';
    icon: 'newspaper';
  };
  attributes: {};
}

export interface SectionsArticlePressListing extends Schema.Component {
  collectionName: 'components_sections_article_press_listings';
  info: {
    displayName: 'article press listing';
    icon: 'newspaper';
  };
  attributes: {};
}

export interface SectionsArticlesManualListing extends Schema.Component {
  collectionName: 'components_sections_articles_manual_listings';
  info: {
    displayName: 'articles manual listing';
    icon: 'newspaper';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    showMoreButton: Attribute.Component<'blocks.button-link'>;
    articles: Attribute.Component<'blocks.article-item', true>;
  };
}

export interface SectionsBranchGroup extends Schema.Component {
  collectionName: 'components_sections_branch_groups';
  info: {
    displayName: 'branch group';
    icon: 'church';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    branches: Attribute.Component<'blocks.branch-item', true>;
  };
}

export interface SectionsBundleListingSimple extends Schema.Component {
  collectionName: 'components_sections_bundle_listing_simples';
  info: {
    displayName: 'bundle listing simple';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    bundles: Attribute.Relation<
      'sections.bundle-listing-simple',
      'oneToMany',
      'api::bundle.bundle'
    >;
  };
}

export interface SectionsBundleListing extends Schema.Component {
  collectionName: 'components_sections_bundle_listings';
  info: {
    displayName: 'bundle listing';
    icon: 'gift';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    outsideMedicalFacility: Attribute.Component<'blocks.bundle-group'>;
    atMedicalFacility: Attribute.Component<'blocks.bundle-group'>;
  };
}

export interface SectionsCemeteriesOpeningHours extends Schema.Component {
  collectionName: 'components_sections_cemeteries_opening_hours';
  info: {
    displayName: 'cemeteries opening hours';
    icon: 'clock';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    showMoreButton: Attribute.Component<'blocks.button-link'>;
    buttonPosition: Attribute.Enumeration<['standard', 'below']> &
      Attribute.DefaultTo<'standard'>;
  };
}

export interface SectionsCeremoniesArchiveSection extends Schema.Component {
  collectionName: 'components_sections_ceremonies_archive_sections';
  info: {
    displayName: 'ceremonies archive section';
    icon: 'feather-alt';
    description: '';
  };
  attributes: {};
}

export interface SectionsCeremoniesSection extends Schema.Component {
  collectionName: 'components_sections_ceremonies_sections';
  info: {
    displayName: 'ceremonies section';
    icon: 'feather-alt';
    description: '';
  };
  attributes: {
    archive: Attribute.Component<'blocks.blocks-ceremony-archive-block'>;
  };
}

export interface SectionsContactGroup extends Schema.Component {
  collectionName: 'components_sections_contact_groups';
  info: {
    displayName: 'contact group';
    icon: 'address-card';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    layout: Attribute.Enumeration<['default', 'condensed']> &
      Attribute.Required &
      Attribute.DefaultTo<'default'>;
    contacts: Attribute.Component<'blocks.contact-item', true>;
  };
}

export interface SectionsCtaSection extends Schema.Component {
  collectionName: 'components_sections_cta_sections';
  info: {
    displayName: 'cta section';
    icon: 'bullhorn';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    ctas: Attribute.Component<'blocks.simple-cta-item', true> &
      Attribute.SetMinMax<{
        min: 1;
        max: 2;
      }>;
  };
}

export interface SectionsDebtorsSection extends Schema.Component {
  collectionName: 'components_sections_debtors_section';
  info: {
    displayName: 'debtors section';
    description: '';
    icon: 'euro-sign';
  };
  attributes: {
    description: Attribute.Text;
  };
}

export interface SectionsDisclosuresSection extends Schema.Component {
  collectionName: 'components_sections_disclosures_sections';
  info: {
    displayName: 'Disclosures section';
    description: '';
  };
  attributes: {};
}

export interface SectionsDivider extends Schema.Component {
  collectionName: 'components_sections_dividers';
  info: {
    displayName: 'divider';
    icon: 'bacon';
    description: '';
  };
  attributes: {
    color: Attribute.Enumeration<['default', 'primary']> &
      Attribute.Required &
      Attribute.DefaultTo<'default'>;
  };
}

export interface SectionsDocumentGroup extends Schema.Component {
  collectionName: 'components_sections_document_groups';
  info: {
    displayName: 'document group';
    icon: 'file-invoice';
  };
  attributes: {
    title: Attribute.String;
    documents: Attribute.Component<'blocks.document-item', true>;
  };
}

export interface SectionsDocumentsSection extends Schema.Component {
  collectionName: 'components_sections_documents_sections';
  info: {
    displayName: 'documents section';
    icon: 'book';
  };
  attributes: {};
}

export interface SectionsGallery extends Schema.Component {
  collectionName: 'components_sections_galleries';
  info: {
    displayName: 'gallery';
    icon: 'images';
  };
  attributes: {
    title: Attribute.String;
    medias: Attribute.Media;
  };
}

export interface SectionsHomepageReviewsSection extends Schema.Component {
  collectionName: 'components_sections_homepage_reviews_sections';
  info: {
    displayName: 'homepage reviews section';
    icon: 'star-half-alt';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    showMoreButton: Attribute.Component<'blocks.button-link'>;
    reviews: Attribute.Relation<
      'sections.homepage-reviews-section',
      'oneToMany',
      'api::review.review'
    >;
  };
}

export interface SectionsIframeSection extends Schema.Component {
  collectionName: 'components_sections_iframe_sections';
  info: {
    displayName: 'iframe section';
    icon: 'code';
  };
  attributes: {
    title: Attribute.String;
    iframeTitle: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    body: Attribute.RichText;
  };
}

export interface SectionsManualListing extends Schema.Component {
  collectionName: 'components_sections_manual_listings';
  info: {
    displayName: 'manual listing';
    icon: 'hand-lizard';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    style: Attribute.Enumeration<['simple', 'service']> &
      Attribute.Required &
      Attribute.DefaultTo<'simple'>;
    showMoreButton: Attribute.Component<'blocks.button-link'>;
    pages: Attribute.Component<'blocks.page-item', true>;
  };
}

export interface SectionsMapOfManagedObjects extends Schema.Component {
  collectionName: 'components_sections_map_of_managed_objects';
  info: {
    displayName: 'Map of managed objects section';
    description: '';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface SectionsMapSection extends Schema.Component {
  collectionName: 'components_sections_map_sections';
  info: {
    displayName: 'map section';
    icon: 'map-marked-alt';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface SectionsMenuListing extends Schema.Component {
  collectionName: 'components_sections_menu_listings';
  info: {
    displayName: 'menu listing';
    icon: 'th-list';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    slug: Attribute.String & Attribute.Required;
  };
}

export interface SectionsNewsListing extends Schema.Component {
  collectionName: 'components_sections_news_listings';
  info: {
    displayName: 'news listing';
    icon: 'newspaper';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    showMoreButton: Attribute.Component<'blocks.button-link'>;
  };
}

export interface SectionsOpeningHoursSection extends Schema.Component {
  collectionName: 'components_sections_opening_hours_sections';
  info: {
    displayName: 'opening hours section';
    icon: 'clock';
  };
  attributes: {
    title: Attribute.String;
    offices: Attribute.Component<'blocks.office-item', true> &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface SectionsPartnersSection extends Schema.Component {
  collectionName: 'components_sections_partners_sections';
  info: {
    displayName: 'partners section';
    icon: 'handshake';
    description: '';
  };
  attributes: {
    featuredPartnersTitle: Attribute.String & Attribute.Required;
    otherPartnersTitle: Attribute.String & Attribute.Required;
  };
}

export interface SectionsProceduresSection extends Schema.Component {
  collectionName: 'components_sections_procedures_sections';
  info: {
    displayName: 'procedures section';
    icon: 'project-diagram';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface SectionsProceduresShortSection extends Schema.Component {
  collectionName: 'components_sections_procedures_short_sections';
  info: {
    displayName: 'procedures short section';
    icon: 'project-diagram';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    showMoreButton: Attribute.Component<'blocks.button-link'>;
  };
}

export interface SectionsPublicDisclosureSection extends Schema.Component {
  collectionName: 'components_sections_public_disclosure_sections';
  info: {
    displayName: 'public disclosure section';
    icon: 'balance-scale-left';
  };
  attributes: {};
}

export interface SectionsReviewListing extends Schema.Component {
  collectionName: 'components_sections_review_listings';
  info: {
    displayName: 'review listing';
    icon: 'star-half-alt';
  };
  attributes: {};
}

export interface SectionsRichtext extends Schema.Component {
  collectionName: 'components_sections_richtexts';
  info: {
    displayName: 'richtext';
    icon: 'align-left';
    description: '';
  };
  attributes: {
    content: Attribute.RichText;
    button: Attribute.Component<'blocks.button-link'>;
  };
}

export interface SectionsUpcomingCeremoniesSection extends Schema.Component {
  collectionName: 'components_sections_upcoming_ceremonies_sections';
  info: {
    displayName: 'upcoming ceremonies section';
    icon: 'feather-alt';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    showMoreButton: Attribute.Component<'blocks.button-link'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blocks.accordion-item-with-price': BlocksAccordionItemWithPrice;
      'blocks.accordion-item': BlocksAccordionItem;
      'blocks.article-item': BlocksArticleItem;
      'blocks.blocks-ceremony-archive-block': BlocksBlocksCeremonyArchiveBlock;
      'blocks.branch-item': BlocksBranchItem;
      'blocks.bundle-content-item': BlocksBundleContentItem;
      'blocks.bundle-group': BlocksBundleGroup;
      'blocks.bundle-item': BlocksBundleItem;
      'blocks.button-link': BlocksButtonLink;
      'blocks.contact-item': BlocksContactItem;
      'blocks.cta': BlocksCta;
      'blocks.document-item': BlocksDocumentItem;
      'blocks.office-item': BlocksOfficeItem;
      'blocks.opening-hours-item': BlocksOpeningHoursItem;
      'blocks.opening-hours-universal': BlocksOpeningHoursUniversal;
      'blocks.page-item': BlocksPageItem;
      'blocks.price-list-item': BlocksPriceListItem;
      'blocks.sidebar': BlocksSidebar;
      'blocks.simple-cta-item': BlocksSimpleCtaItem;
      'blocks.social-item': BlocksSocialItem;
      'general.contacts': GeneralContacts;
      'general.footer': GeneralFooter;
      'general.header': GeneralHeader;
      'general.link-item': GeneralLinkItem;
      'general.procedure-item': GeneralProcedureItem;
      'general.procedure': GeneralProcedure;
      'general.seo': GeneralSeo;
      'general.social': GeneralSocial;
      'sections.accordion-group': SectionsAccordionGroup;
      'sections.article-jobs-listing': SectionsArticleJobsListing;
      'sections.article-news-listing': SectionsArticleNewsListing;
      'sections.article-press-listing': SectionsArticlePressListing;
      'sections.articles-manual-listing': SectionsArticlesManualListing;
      'sections.branch-group': SectionsBranchGroup;
      'sections.bundle-listing-simple': SectionsBundleListingSimple;
      'sections.bundle-listing': SectionsBundleListing;
      'sections.cemeteries-opening-hours': SectionsCemeteriesOpeningHours;
      'sections.ceremonies-archive-section': SectionsCeremoniesArchiveSection;
      'sections.ceremonies-section': SectionsCeremoniesSection;
      'sections.contact-group': SectionsContactGroup;
      'sections.cta-section': SectionsCtaSection;
      'sections.debtors-section': SectionsDebtorsSection;
      'sections.disclosures-section': SectionsDisclosuresSection;
      'sections.divider': SectionsDivider;
      'sections.document-group': SectionsDocumentGroup;
      'sections.documents-section': SectionsDocumentsSection;
      'sections.gallery': SectionsGallery;
      'sections.homepage-reviews-section': SectionsHomepageReviewsSection;
      'sections.iframe-section': SectionsIframeSection;
      'sections.manual-listing': SectionsManualListing;
      'sections.map-of-managed-objects': SectionsMapOfManagedObjects;
      'sections.map-section': SectionsMapSection;
      'sections.menu-listing': SectionsMenuListing;
      'sections.news-listing': SectionsNewsListing;
      'sections.opening-hours-section': SectionsOpeningHoursSection;
      'sections.partners-section': SectionsPartnersSection;
      'sections.procedures-section': SectionsProceduresSection;
      'sections.procedures-short-section': SectionsProceduresShortSection;
      'sections.public-disclosure-section': SectionsPublicDisclosureSection;
      'sections.review-listing': SectionsReviewListing;
      'sections.richtext': SectionsRichtext;
      'sections.upcoming-ceremonies-section': SectionsUpcomingCeremoniesSection;
    }
  }
}
