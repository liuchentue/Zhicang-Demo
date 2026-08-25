import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"知仓｜与你的持仓有关的每日判断",description:"知仓静态产品演示：每日简报、组合影响与视频分镜预览。",openGraph:{title:"知仓｜与你的持仓有关的每日判断",description:"把新闻变成与你有关的判断",images:["/og.png"]}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}
