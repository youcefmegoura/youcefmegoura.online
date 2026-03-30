import type { Profile, Meta } from '@/lib/types';

interface SEOHeadProps {
  profile: Profile;
  meta: Meta;
  locale?: 'fr' | 'en';
}

export function SEOHead({ profile, meta, locale = 'fr' }: SEOHeadProps) {
  const title = profile.title[locale];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: title,
    url: meta.site_url,
    image: `${meta.site_url}${profile.photo}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
    },
    sameAs: [
      meta.social.linkedin,
      meta.social.github,
      meta.social.twitter,
    ],
    email: meta.social.email,
    telephone: meta.social.phone,
    description: profile.summary[locale],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
