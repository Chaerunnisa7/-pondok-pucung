import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

export const metadata = {
  title: {
    default: 'Kelurahan Pondok Pucung',
    template: '%s | Kelurahan Pondok Pucung',
  },
  description: 'Website resmi Kelurahan Pondok Pucung, Kecamatan Pondok Aren, Kota Tangerang Selatan. Melayani masyarakat dengan pelayanan administrasi yang cepat, mudah, dan transparan.',
  keywords: ['Kelurahan Pondok Pucung', 'Pondok Aren', 'Tangerang Selatan', 'pelayanan publik'],
  authors: [{ name: 'Kelurahan Pondok Pucung' }],
  openGraph: {
    title: 'Kelurahan Pondok Pucung',
    description: 'Website resmi Kelurahan Pondok Pucung, Kecamatan Pondok Aren, Kota Tangerang Selatan.',
    locale: 'id_ID',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}