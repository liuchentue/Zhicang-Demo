"use client";
import { useEffect, useMemo, useState } from "react";

const holdings = [
  ["NBIS","Nebius",22.3,"AI 云"],["MU","美光科技",12.6,"存储"],["BE","Bloom Energy",11.7,"能源"],["KORU","KORU",8.2,"韩国科技"],
  ["LITE","Lumentum",7.6,"光通信"],["SNDK","SanDisk",6.9,"存储"],["CIEN","Ciena",6.8,"网络"],["PENG","Penguin Solutions",6.3,"AI 基建"],
  ["CRDO","Credo",6.1,"互连"],["WDC","西部数据",4.0,"存储"],["NVDA","英伟达",3.8,"AI 芯片"],["CRWD","CrowdStrike",3.5,"安全"],
] as const;
const scenes = [
  ["英伟达波动牵动四股","期权市场计入财报后 5.4% 的双向波动，首先影响 NVDA、MU、WDC 和 SNDK。"],
  ["5.4% 不代表涨跌方向","这只是价格信号。真正决定方向的，是业绩、需求与资本开支指引。"],
  ["四项持仓合计 27.3%","直接持有 NVDA 的仓位不高，但存储链会随 AI 需求预期一起重新定价。"],
  ["先核对需求，再判断方向","如果指引确认需求，存储链可能受益；若资本开支放缓，联动风险会放大。"],
  ["下一观察点","财报后优先检查数据中心收入、客户需求和资本开支指引，而不是只看股价。"],
] as const;
const history = [
  ["08.24","英伟达财报将检验四只持仓","影响混合","NVDA · MU · WDC · SNDK"],
  ["08.24","美光称 AI 内存供需缺口仍在","偏正面","MU · WDC · SNDK"],
  ["08.21","美光长期研发利好仍待盈利兑现","中性","MU · WDC · SNDK"],
  ["08.19","Nebius 拟融资 45 亿美元","偏负面","NBIS"],
];
function Mark(){return <span className="mark" aria-hidden="true">知</span>}

export default function Home(){
  const [tab,setTab]=useState("brief"),[playing,setPlaying]=useState(false),[scene,setScene]=useState(0),[query,setQuery]=useState("");
  useEffect(()=>{if(!playing)return;const timer=window.setInterval(()=>setScene(v=>(v+1)%scenes.length),4000);return()=>window.clearInterval(timer)},[playing]);
  const filtered=useMemo(()=>holdings.filter(([ticker,name])=>`${ticker}${name}`.toLowerCase().includes(query.toLowerCase())),[query]);
  return <main>
    <header className="topbar"><a className="brand" href="#top"><Mark/><span>知仓</span><small>把新闻变成与你有关的判断</small></a><nav>{[["brief","今日简报"],["portfolio","我的组合"],["history","历史记录"]].map(([id,label])=><button key={id} className={tab===id?"active":""} onClick={()=>setTab(id)}>{label}</button>)}</nav><span className="demo-pill">静态演示版</span></header>
    <section className="hero" id="top"><div><p className="eyebrow">2026 年 8 月 24 日 · 组合快照</p><h1>今天最值得你关注的，<br/><em>不是一只股票。</em></h1><p className="lead">英伟达财报前，期权市场已经为显著波动定价。真正需要重估的是它如何传导至你的存储与 AI 基础设施仓位。</p><div className="hero-actions"><button className="primary" onClick={()=>{setTab("brief");document.getElementById("content")?.scrollIntoView({behavior:"smooth"})}}>查看今日判断</button><span>约 1 分钟阅读</span></div></div><div className="signal-card"><span>组合影响范围</span><strong>27.3%</strong><div className="tickers"><b>NVDA</b><b>MU</b><b>WDC</b><b>SNDK</b></div><p>方向尚未确认 · 置信度 84</p></div></section>
    <section className="content" id="content">
    {tab==="brief"&&<><div className="section-head"><div><p className="eyebrow">TODAY&apos;S BRIEFING</p><h2>英伟达财报前的联动检验</h2></div><span className="status"><i/>已完成分析</span></div><div className="brief-grid">
      <article className="brief-card"><span>01</span><div><h3>价格信号</h3><p>期权市场隐含财报后约 5.4% 的双向波动。它说明市场预期分歧很大，但不代表上涨或下跌方向。</p></div></article>
      <article className="brief-card accent"><span>02</span><div><h3>与你的关系</h3><p>你直接持有 NVDA 的仓位为 3.8%，但 MU、WDC 与 SNDK 也会随 AI 需求预期重新定价，合计影响 27.3%。</p></div></article>
      <article className="brief-card"><span>03</span><div><h3>下一观察点</h3><p>财报后先看数据中心收入、需求能见度与资本开支指引，再判断存储链的供需逻辑是否得到验证。</p></div></article>
    </div><div className="video-section"><div className="video-copy"><p className="eyebrow">60 秒分镜预览</p><h2>把判断讲清楚，而不只是读新闻</h2><p>线上视频包目前完成到分镜阶段。此处用原始旁白和结构还原播放体验，不调用任何模型或后端。</p><div className="scene-dots">{scenes.map((_,i)=><button key={i} aria-label={`第 ${i+1} 幕`} className={scene===i?"active":""} onClick={()=>setScene(i)}/>)}</div></div><div className="phone"><div className="phone-stage"><span className="scene-no">0{scene+1} / 05</span><div className="chip-row"><span>NVDA</span><span>MU</span><span>WDC</span><span>SNDK</span></div><div className="frame-title"><small>知仓 · 每日持仓简报</small><h3>{scenes[scene][0]}</h3></div><p className="caption">{scenes[scene][1]}</p><button className="play" onClick={()=>setPlaying(!playing)}>{playing?"Ⅱ":"▶"}</button></div></div></div></>}
    {tab==="portfolio"&&<><div className="section-head"><div><p className="eyebrow">PORTFOLIO SNAPSHOT</p><h2>12 项持仓 · 权重脱敏展示</h2></div><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索代码或公司"/></div><div className="portfolio-summary"><div><span>最大单项仓位</span><strong>NBIS 22.3%</strong></div><div><span>存储链暴露</span><strong>23.5%</strong></div><div><span>AI 与基础设施</span><strong>68.7%</strong></div></div><div className="holding-list">{filtered.map(([ticker,name,weight,sector])=><article key={ticker}><div className="ticker-mark">{ticker.slice(0,2)}</div><div><h3>{ticker}<small>{name}</small></h3><span>{sector}</span></div><div className="bar"><i style={{width:`${Math.min(weight*3.6,100)}%`}}/></div><strong>{weight}%</strong></article>)}</div></>}
    {tab==="history"&&<><div className="section-head"><div><p className="eyebrow">BRIEFING ARCHIVE</p><h2>最近判断</h2></div><span className="muted">静态快照 · 不会自动更新</span></div><div className="history-list">{history.map(([date,title,direction,tickers],i)=><button key={i} onClick={()=>setTab("brief")}><time>{date}</time><div><h3>{title}</h3><span>{tickers}</span></div><b className={direction==="偏负面"?"negative":""}>{direction}</b><i>↗</i></button>)}</div></>}
    </section><footer><div className="brand"><Mark/><span>知仓</span></div><p>本页面仅用于产品原型展示，不构成投资建议。数据为脱敏静态快照，不提供登录、交易、模型生成或实时更新。</p><span>Snapshot · 2026.08.24</span></footer>
  </main>
}
