import Link from 'next/link'

// Komponen reusable untuk header di halaman dalam
// Cara pakai: <PageHeader judul="Profil" deskripsi="..." />
export default function PageHeader({ judul, deskripsi }) {
  return (
    <div className="page-header">
      <div className="page-header-inner">
        <div className="breadcrumb">
          <Link href="/">Beranda</Link>
          <span>›</span>
          <span>{judul}</span>
        </div>
        <h1>{judul}</h1>
        {deskripsi && <p>{deskripsi}</p>}
      </div>
    </div>
  )
}
