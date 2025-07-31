import React from 'react'
import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Skyfluence Beauty - Personalized Beauty Quiz',
  description: 'Discover your perfect beauty routine with our AI-powered facial analysis quiz',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Skyfluence Beauty - Personalized Beauty Quiz</title>
        <meta name="description" content="Take our personalized beauty quiz to discover your perfect skincare and makeup routine." />
        
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_title: 'Beauty Quiz',
              custom_map: {
                'custom_parameter_1': 'quiz_step',
                'custom_parameter_2': 'quiz_answer',
                'custom_parameter_3': 'session_id'
              }
            });
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ''); // Pixel ID is empty, user to fill
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=&ev=PageView&noscript=1" // Pixel ID is empty
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  )
} 