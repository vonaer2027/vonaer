import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/components/locale-provider";
import { ScrollToTop } from "@/components/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const pretendard = localFont({
  src: [
    {
      path: "../fonts/Pretendard-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vonaer.com"),
  title: {
    default: "전용기 예약 플랫폼 본에어 (VONAER) | 24/7 실시간 컨시어지 서비스",
    template: "%s | 본에어 VONAER",
  },
  description: "국내 최초 전용기 예약 플랫폼. 복잡한 절차 없이 앱으로 요청하세요. 365일 24시간 전문 컨시어지가 최적의 항공편과 의전 서비스를 설계해 드립니다.",
  keywords: ["전용기 예약", "본에어", "VONAER", "프라이빗 제트", "비즈니스 제트", "컨시어지 서비스", "항공 의전", "전세기", "헬리콥터", "VIP 항공", "엠프티레그", "private jet korea"],
  authors: [{ name: "본에어 VONAER" }],
  creator: "본에어 VONAER",
  publisher: "본에어 VONAER",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://vonaer.com",
    languages: {
      "ko-KR": "https://vonaer.com",
    },
  },
  openGraph: {
    title: "전용기 예약 플랫폼 본에어 (VONAER) | 24/7 실시간 컨시어지 서비스",
    description: "국내 최초 전용기 예약 플랫폼. 복잡한 절차 없이 앱으로 요청하세요. 365일 24시간 전문 컨시어지가 최적의 항공편과 의전 서비스를 설계해 드립니다.",
    url: "https://vonaer.com",
    images: [
      {
        url: "/vonaer.png",
        width: 1200,
        height: 630,
        alt: "전용기 예약 플랫폼 본에어 VONAER - 24/7 컨시어지 서비스",
      },
    ],
    locale: "ko_KR",
    type: "website",
    siteName: "본에어 VONAER",
  },
  twitter: {
    card: "summary_large_image",
    title: "전용기 예약 플랫폼 본에어 (VONAER) | 24/7 실시간 컨시어지 서비스",
    description: "국내 최초 전용기 예약 플랫폼. 복잡한 절차 없이 앱으로 요청하세요. 365일 24시간 전문 컨시어지가 최적의 항공편과 의전 서비스를 설계해 드립니다.",
    images: ["/vonaer.png"],
    creator: "@vonaer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} ${pretendard.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider>
            {children}
            <ScrollToTop />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}