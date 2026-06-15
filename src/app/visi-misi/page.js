import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: 'Visi & Misi | Kelurahan Pondok Pucung',
}

// Data misi disimpan di sini agar mudah diubah
const dataMisi = [
  {
    judul: 'Pelayanan Administrasi Prima',
    deskripsi:
      'Meningkatkan kualitas pelayanan administrasi yang cepat, tepat, akurat, serta berorientasi pada kepuasan masyarakat.',
  },
  {
    judul: 'Pemerintahan Transparan dan Akuntabel',
    deskripsi:
      'Mewujudkan tata kelola pemerintahan kelurahan yang terbuka, jujur, bertanggung jawab, dan dapat dipertanggungjawabkan kepada masyarakat.',
  },
  {
    judul: 'Partisipasi dan Pemberdayaan Masyarakat',
    deskripsi:
      'Mendorong peran aktif masyarakat dalam pembangunan, kegiatan sosial, serta pemberdayaan lingkungan secara berkelanjutan.',
  },
  {
    judul: 'Ketertiban, Kebersihan, dan Kenyamanan',
    deskripsi:
      'Menjaga lingkungan kelurahan yang aman, tertib, bersih, sehat, dan nyaman untuk seluruh warga.',
  },
  {
    judul: 'Koordinasi dan Kerja Sama',
    deskripsi:
      'Mengoptimalkan koordinasi dan kerja sama dengan masyarakat, lembaga kemasyarakatan, serta instansi terkait untuk mendukung pembangunan wilayah.',
  },
]

const nilaiNilai = [
  { ikon: '🤝', judul: 'Integritas', deskripsi: 'Bertindak jujur dan konsisten dalam setiap pelayanan' },
  { ikon: '⚡', judul: 'Profesional', deskripsi: 'Memberikan layanan dengan kompetensi dan tanggung jawab tinggi' },
  { ikon: '💚', judul: 'Peduli', deskripsi: 'Mengutamakan kepentingan dan kebutuhan masyarakat' },
  { ikon: '🔍', judul: 'Transparan', deskripsi: 'Terbuka dalam setiap proses dan pengambilan keputusan' },
]

export default function VisiMisiPage() {
  return (
    <>
      <PageHeader
        judul="Visi & Misi"
        deskripsi="Arah dan tujuan Kelurahan Pondok Pucung dalam melayani masyarakat"
      />

      {/* ===== VISI ===== */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header tengah">
            <span className="label-section">Visi</span>
            <h2>Visi Kelurahan Pondok Pucung</h2>
          </div>

          <div className="visi-card">
            <h2>VISI</h2>
            <p>
              "Terwujudnya pelayanan kelurahan yang profesional, transparan, responsif, dan berorientasi pada kepuasan masyarakat."
            </p>
          </div>

          {/* Penjelasan Visi */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '32px' }}>
            {[
              { kata: 'Profesional', makna:'Memberikan pelayanan sesuai standar kerja yang kompeten, efektif, dan bertanggung jawab.' },
              { kata: 'Transparan', makna: 'Menyediakan informasi dan proses pelayanan secara terbuka, jelas, dan mudah diakses masyarakat.' },
              { kata: 'Responsif', makna: 'Cepat tanggap terhadap kebutuhan, keluhan, dan aspirasi masyarakat dalam setiap pelayanan.' },
              { kata: 'Kepuasan Masyarakat', makna: 'Mengutamakan kualitas pelayanan untuk memenuhi harapan dan kebutuhan masyarakat secara optimal.' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: 'var(--radius-medium)',
                padding: '24px',
                boxShadow: 'var(--bayangan)',
                borderTop: '3px solid var(--emas)'
              }}>
                <h3 style={{ color: 'var(--hijau-tua)', fontFamily: 'var(--font-judul)', fontSize: '20px', marginBottom: '10px' }}>
                  {item.kata}
                </h3>
                <p style={{ color: 'var(--abu-gelap)', fontSize: '14px', lineHeight: '1.7' }}>{item.makna}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISI ===== */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header tengah">
            <span className="label-section">Misi</span>
            <h2>Misi Kelurahan Pondok Pucung</h2>
            <p>Langkah nyata untuk mewujudkan visi kelurahan yang maju dan sejahtera.</p>
          </div>

          <div className="misi-list">
            {dataMisi.map((misi, index) => (
              <div key={index} className="misi-item">
                <div className="misi-nomor">{index + 1}</div>
                <div className="misi-teks">
                  <h3>{misi.judul}</h3>
                  <p>{misi.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NILAI-NILAI ===== */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header tengah">
            <span className="label-section">Nilai Kami</span>
            <h2>Nilai-Nilai yang Kami Junjung</h2>
          </div>

          <div className="layanan-grid">
            {nilaiNilai.map((nilai, i) => (
              <div key={i} className="layanan-card">
                <div className="layanan-ikon">{nilai.ikon}</div>
                <h3>{nilai.judul}</h3>
                <p>{nilai.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
