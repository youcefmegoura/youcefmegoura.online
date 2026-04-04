import type {Metadata} from "next";
import {GoogleAnalytics} from '@next/third-parties/google'
import {ClarityProvider} from "@/components/ClarityProvider";
import {Inter, JetBrains_Mono} from "next/font/google";
import {Providers} from "@/components/Providers";
import "./globals.css";


const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-mono",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://youcefmegoura.online"),
    title: "~/youcefmegoura",
    description:
        "Backend and DevOps Engineer",
    openGraph: {
        title: "Youcef Megoura — Backend & DevOps Engineer",
        description:
            "Backend and DevOps Engineer.",
        url: "https://youcefmegoura.online",
        siteName: "Youcef Megoura",
        images: [{url: "/og-cover.jpg", width: 1200, height: 630}],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Youcef Megoura — Backend & DevOps Engineer",
        description:
            "Backend and DevOps Engineer.",
        images: ["/og-cover.jpg"],
    },
    keywords: [
        "Backend Engineer", "DevOps Engineer", "Java Developer", "Kotlin",
        "Spring Boot", "Kubernetes", "Docker", "CI/CD", "Rennes", "France",
        "Microservices", "IoT", "Cloud Infrastructure", "Startup"
    ],
    alternates: {
        canonical: "https://youcefmegoura.online",
    },
    robots: {index: true, follow: true},
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="fr"
            className={`${inter.variable} ${jetbrainsMono.variable}`}
            suppressHydrationWarning
        >
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light')}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`,
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        name: "Youcef MEGOURA",
                        jobTitle: "Backend & DevOps Engineer",
                        url: "https://youcefmegoura.online",
                        image: "https://youcefmegoura.online/images/profile/youcefmegoura.jpg",
                        email: "ymegoura@gmail.com",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Rennes",
                            addressCountry: "FR",
                        },
                        sameAs: [
                            "https://www.linkedin.com/in/youcefmegoura/",
                            "https://github.com/youcefmegoura",
                        ],
                        knowsAbout: [
                            "Java", "Kotlin", "Spring Boot", "Kubernetes", "Docker",
                            "CI/CD", "Microservices", "IoT", "DevOps", "Cloud Infrastructure",
                            "PostgreSQL", "Kafka", "Helm", "Terraform", "Ansible",
                        ],
                        alumniOf: {
                            "@type": "CollegeOrUniversity",
                            name: "University of Constantine 2",
                        },
                    }),
                }}
            />
        </head>
        <body className="font-sans bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID}/>}
        {process.env.NEXT_PUBLIC_CLARITY_ID && <ClarityProvider/>}
        </body>
        </html>
    );
}
