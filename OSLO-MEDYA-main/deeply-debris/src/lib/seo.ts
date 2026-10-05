import { site } from '../data/site';

const absolute = (path: string) => new URL(path, site.url).toString();

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  description: site.description,
  telephone: site.contact.phone,
  email: site.contact.email,
  image: absolute('/og-default.jpg'),
  areaServed: [
    { '@type': 'City', name: 'Aydın' },
    { '@type': 'Country', name: 'Türkiye' },
  ],
  address: { '@type': 'PostalAddress', addressLocality: 'Aydın', addressCountry: 'TR' },
  sameAs: site.social.map((link) => link.href),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absolute(item.path),
  })),
});

export const articleLd = (article: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: article.title,
  description: article.description,
  mainEntityOfPage: absolute(article.path),
  datePublished: article.datePublished,
  dateModified: article.dateModified ?? article.datePublished,
  inLanguage: 'tr-TR',
  image: absolute('/og-default.jpg'),
  author: { '@type': 'Organization', name: site.name, url: site.url },
  publisher: { '@type': 'Organization', name: site.name, url: site.url },
});

export const serviceLd = (service: { name: string; description: string; path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  url: absolute(service.path),
  provider: { '@id': `${site.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Aydın' },
});
