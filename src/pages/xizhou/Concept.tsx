import { motion } from 'framer-motion'
import { fade, SectionHead, SubHead } from './shared'

const problems = [
  { k: '找不到', body: '游客中心、厕所、休息点散在不同牌子和平台，指引时常中断。' },
  { k: '看不懂', body: '照壁题字、屋檐做法、甲马版画，看得见却看不懂。' },
  { k: '用不了', body: '部分区域网络不稳，依赖实时加载的内容常打不开。' },
]

const chain = ['甲马文化研究', '用户研究', 'Persona', '用户需求', '用户旅程', '文化触点分析', 'AI 服务策略', '信息架构', 'UI 设计系统', '高保真界面', '场景验证']

const flow = [
  { t: '用户需求', s: '游客想怎么玩' },
  { t: 'AI 理解需求', s: '时间 · 类型 · 偏好' },
  { t: 'AI 生成个性化服务', s: '路线 · 讲解 · 提醒' },
  { t: '完成公共服务体验', s: '厕所 · 母婴 · 无障碍' },
  { t: '自然接触甲马文化', s: '不是装饰，是触点' },
  { t: '数字福印', s: '沉淀文化记忆' },
]

/** UI proportion plan: [label, pct, colour, core pages] — straight from the 比例规划 page. */
const ratio: [string, number, string, string[]][] = [
  ['AI 智能导览', 30, '#f0a63e', ['首页', 'AI 聊天页', 'AI 路线生成页']],
  ['导览导航', 30, '#9bb86a', ['景区地图', '路线规划', '景点详情']],
  ['文化体验', 25, '#d9301f', ['神祇卡片', '甲马故事', '福印收集']],
  ['公共服务', 10, '#25402f', ['服务地图', '无障碍模式']],
  ['我的', 5, '#8f947a', ['我的福印', '游览记录']],
]

const donut = (() => {
  let acc = 0
  return `conic-gradient(${ratio.map(([, p, c]) => { const a = acc; acc += p; return `${c} ${a}% ${acc}%` }).join(',')})`
})()

export default function Concept() {
  return (
    <section className="wrap py-14 md:py-20">
      <SectionHead no="01" cn="构思" en="Concept · 发心、链路与 UI 比例" />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {problems.map((p, i) => (
          <motion.div key={p.k} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }} className="xz-card p-6">
            <p className="font-display text-[11px] tracking-widest opacity-60">现场看到的问题 {String(i + 1).padStart(2, '0')}</p>
            <p className="xz-serif mt-2 text-4xl font-black">{p.k}</p>
            <p className="mt-3 text-sm leading-7 opacity-80">{p.body}</p>
          </motion.div>
        ))}
      </div>
      <motion.p {...fade} className="xz-p mt-6 border-l-[3px] border-[var(--xz-cinnabar)] pl-4 text-sm font-bold leading-7">
        甲马本来就和出行、安全、健康、社区绑在一起，所以按它的功能语义转译，而不是当装饰。
      </motion.p>

      <div className="mt-16">
        <SubHead k="A" cn="发心与设计目标" en="Motivation · Goal" />
        <div className="grid gap-5 md:grid-cols-2">
          <motion.div {...fade} className="xz-card relative overflow-hidden p-6 md:p-8">
            <span aria-hidden className="xz-serif absolute -right-2 -top-6 text-[8rem] font-black leading-none text-[var(--xz-green)] opacity-25">心</span>
            <p className="font-display text-[11px] tracking-widest text-[var(--xz-cinnabar)]">发心</p>
            <ul className="xz-serif relative mt-4 space-y-3 text-lg font-black leading-8 md:text-xl">
              <li><span className="text-[var(--xz-cinnabar)]">以公共服务</span>解决游客游览需求</li>
              <li><span className="text-[var(--xz-cinnabar)]">以 AI</span> 提供个性化陪伴</li>
              <li><span className="text-[var(--xz-cinnabar)]">以甲马文化</span>构建情感体验</li>
            </ul>
          </motion.div>
          <motion.div {...fade} className="xz-dark relative overflow-hidden rounded-2xl p-6 md:p-8">
            <p className="font-display text-[11px] tracking-widest text-[var(--xz-orange)]">设计目标</p>
            <p className="xz-serif mt-4 text-2xl font-black leading-10 md:text-3xl md:leading-[3rem]">
              让游客<mark className="xz-mark">方便地游览</mark>、<mark className="xz-mark">自然地了解</mark>、<mark className="xz-mark">主动地传承</mark>白族甲马文化。
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mt-16">
        <SubHead k="B" cn="初步构思" en="From research to validation" />
        <ol className="xz-chain list-none">
          {chain.map((c, i) => (
            <motion.li key={c} {...fade} transition={{ ...fade.transition, delay: Math.min(i, 6) * 0.04 }}>
              <span className="xz-chain-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="xz-chain-t">{c}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-16">
        <SubHead k="C" cn="产品链路" en="Product flow" />
        <ol className="xz-flow list-none">
          {flow.map((f, i) => (
            <motion.li key={f.t} {...fade} transition={{ ...fade.transition, delay: i * 0.07 }} className={i === flow.length - 1 ? 'xz-flow-last' : ''}>
              <b className="xz-serif block text-base font-black leading-6 md:text-lg">{f.t}</b>
              <span className="mt-1 block text-xs opacity-70">{f.s}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-16">
        <SubHead k="D" cn="UI 构成比例" en="Proportion plan" />
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,320px)_1fr]">
          <motion.div {...fade} className="xz-donut mx-auto" style={{ background: donut }} role="img" aria-label="UI 比例：AI 智能导览 30%，导览导航 30%，文化体验 25%，公共服务 10%，我的 5%">
            <span className="xz-serif text-3xl font-black">UI</span>
            <small className="font-display text-[10px] tracking-widest opacity-60">100%</small>
          </motion.div>
          <ul className="grid gap-4">
            {ratio.map(([name, pct, color, pages]) => (
              <motion.li key={name} {...fade}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm font-black"><i className="inline-block h-3 w-3 rounded-sm border border-[var(--xz-line)]" style={{ background: color }} />{name}</span>
                  <span className="xz-no text-xl">{pct}%</span>
                </div>
                <div className="xz-bar mt-1.5" aria-hidden><i style={{ width: `${pct * 3}%`, maxWidth: '100%', background: color }} /></div>
                <p className="mt-1.5 text-xs opacity-70">{pages.join(' · ')}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
