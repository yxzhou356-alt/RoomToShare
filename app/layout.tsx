import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'Room to Share — at your own pace', description:'A gentle, private space to find your words, reflect on connection, and choose one small thing to try.', icons:{icon:'/favicon.svg'} };
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>;}
