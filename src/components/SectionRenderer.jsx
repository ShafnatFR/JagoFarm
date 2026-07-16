import { useState } from 'react'
import { validImageUrl } from '../lib/cms.js'
import HeroSection from './HeroSection.jsx'
import SolutionsSection from './SolutionsSection.jsx'
import FeaturedProductsSection from './FeaturedProductsSection.jsx'
import LatestArticle from './LatestArticle.jsx'
import ContactSection from './ContactSection.jsx'

const EmptySection = () => <section className="section-shell cms-empty" aria-live="polite">Konten sedang disiapkan.</section>

function RichText({ data }) {
  return <section className="section-shell cms-rich-text" dangerouslySetInnerHTML={{ __html: data?.content || '' }} />
}

function ProfileTabs({ data }) {
  const tabs = Array.isArray(data?.tabs) ? data.tabs : []
  const [active, setActive] = useState(0)
  if (!tabs.length) return <EmptySection />
  const current = tabs[active] || tabs[0]
  return <section className="section-shell cms-tabs"><h2>{data?.title || 'Profil'}</h2><div className="cms-tab-buttons">{tabs.map((tab, index) => <button type="button" key={`${tab?.tab_label || 'tab'}-${index}`} onClick={() => setActive(index)}>{tab?.tab_label || `Tab ${index + 1}`}</button>)}</div><div dangerouslySetInnerHTML={{ __html: current?.tab_content || '' }} /></section>
}

function GenericCards({ data, items, title, imageKey, nameKey, textKey }) {
  if (!items.length) return <EmptySection />
  return <section className="solutions section-shell motion-section"><div className="section-heading"><h2>{title || 'JagoFarm'}</h2>{data?.subtitle && <p>{data.subtitle}</p>}</div><div className="service-grid">{items.map((item, index) => { const image = validImageUrl(item?.[imageKey]); return <article className="service-card" key={item?.id || item?.slug || index}>{image && <div className="service-image"><img src={image} alt={item?.[nameKey] || ''} referrerPolicy="no-referrer" loading="lazy" /></div>}<h3>{item?.[nameKey] || 'Tanpa judul'}</h3><p>{item?.[textKey] || ''}</p></article> })}</div></section>
}

function Faq({ data }) {
  const items = Array.isArray(data?.faq_items) ? data.faq_items : []
  return <section className="section-shell cms-faq"><h2>{data?.title || 'Pertanyaan Umum'}</h2>{items.map((item, index) => <details key={index}><summary>{item?.question || 'Pertanyaan'}</summary><p>{item?.answer || ''}</p></details>)}</section>
}

function Cta({ data }) {
  const image = validImageUrl(data?.background_image)
  return <section className="section-shell cms-cta" style={{ backgroundColor: data?.background_color || undefined }}>{image && <img className="cms-cta-bg" src={image} alt="" referrerPolicy="no-referrer" />}<h2>{data?.headline || 'Mari bertumbuh bersama.'}</h2><p>{data?.sub_headline || ''}</p><div>{(Array.isArray(data?.buttons_list) ? data.buttons_list : []).map((button, index) => <a href={button?.button_link || '#'} key={index}>{button?.button_text || 'Pelajari lebih lanjut'}</a>)}</div></section>
}

export default function SectionRenderer({ blocks, posts, onNavigate, theme, onToggleTheme }) {
  if (!Array.isArray(blocks) || !blocks.length) return <EmptySection />
  return <>{blocks.map((block, index) => {
    const data = block?.data || {}
    const key = block?.id || `${block?.type || 'block'}-${index}`
    switch (block?.type) {
      case 'hero': return <HeroSection key={key} data={data} theme={theme} onToggleTheme={onToggleTheme} />
      case 'features': return <SolutionsSection key={key} data={data} />
      case 'gallery': return <FeaturedProductsSection key={key} data={data} />
      case 'post_feed': return <LatestArticle key={key} data={data} posts={posts} />
      case 'contacts': return <ContactSection key={key} data={data} onNavigate={onNavigate} />
      case 'rich_text': return <RichText key={key} data={data} />
      case 'profile_tabs': return <ProfileTabs key={key} data={data} />
      case 'activity_slider': return <GenericCards key={key} data={data} items={Array.isArray(data.activity_cards) ? data.activity_cards : []} title={data.title} imageKey="image_url" nameKey="card_title" textKey="description" />
      case 'testimonials': return <GenericCards key={key} data={data} items={Array.isArray(data.testimonial_items) ? data.testimonial_items : []} title={data.title} nameKey="author_name" textKey="testimonial_content" imageKey="author_image" />
      case 'partners': return <GenericCards key={key} data={data} items={Array.isArray(data.partner_logos) ? data.partner_logos : []} title={data.title} nameKey="partner_name" textKey="website_url" imageKey="logo_image" />
      case 'team_members': return <GenericCards key={key} data={data} items={Array.isArray(data.members) ? data.members : []} title={data.title} nameKey="name" textKey="short_bio" imageKey="photo" />
      case 'faq': return <Faq key={key} data={data} />
      case 'cta_banner': return <Cta key={key} data={data} />
      default: console.warn(`Unknown CMS block type: ${block?.type}`); return null
    }
  })}</>
}
