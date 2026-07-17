import { ArrowLeft } from '@phosphor-icons/react'
import { formatCmsDate, postContent, postImage } from '../lib/cms.js'

export default function ArticleDetail({ post, onNavigate }) {
  if (!post) return <main className="article-detail page-shell"><h1>Artikel tidak ditemukan.</h1><button type="button" onClick={() => onNavigate('/artikel')}><ArrowLeft size={18} /> Kembali ke daftar artikel</button></main>
  const content = postContent(post)
  return <main className="article-detail page-shell"><button className="article-back" type="button" onClick={() => onNavigate('/artikel')}><ArrowLeft size={18} /> Kembali ke daftar artikel</button><article><small>{formatCmsDate(post.published_at || post.created_at)}</small><h1>{post.title}</h1>{postImage(post) && <img className="article-detail-image" src={postImage(post)} alt="" referrerPolicy="no-referrer" />}{content.body_content && <div className="article-body" dangerouslySetInnerHTML={{ __html: content.body_content }} />}</article></main>
}
