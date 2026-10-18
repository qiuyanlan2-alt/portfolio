import { motion } from 'framer-motion'
import { fade, SubHead } from './shared'

const stages = [
  { s: '到达前', act: '搜索攻略', mood: '迷茫', y: 52, pain: '信息分散，难以规划', opp: 'AI 生成个性化游览方案' },
  { s: '进入景区', act: '寻找路线', mood: '焦虑', y: 82, pain: '不知道从哪里开始', opp: 'AI 地图导航 + 推荐路线' },
  { s: '文化体验', act: '浏览景点', mood: '疑惑', y: 62, pain: '看不懂文化背景', opp: 'AI 神祇讲解 + 故事导览' },
  { s: '服务获取', act: '寻找设施', mood: '不安', y: 76, pain: '厕所、母婴室等难找', opp: 'AI 公共服务导航' },
  { s: '游览结束', act: '分享回忆', mood: '满足', y: 14, pain: '游览体验无法沉淀', opp: '数字福印 + 游览纪念卡' },
]

const touch = [
  { t: '游览前', en: 'Before', body: [['触点', 'AI 推荐路线'], ['文化融合', '根据游客兴趣推荐：祈福路线 · 建筑路线 · 非遗体验路线']] },
  { t: '游览中', en: 'During', body: [['触点 1 · 地点导航', '普通：“前方 500 米到达景点” → 升级：“前方甲马祈福点，传说这里供奉××神祇”'], ['触点 2 · 神祇文化', '通过 AI 识别：神祇形象 · 象征意义 · 民俗故事'], ['触点 3 · 数字福印', '完成文化探索后获得：电子甲马印章 · 个人文化地图 · 游览纪念册']] },
  { t: '游览后', en: 'After', body: [['触点', '分享传播，生成“我的甲马文化旅程”'], ['结果', '形成文化传播闭环']] },
]

const matrix = [
  ['路线规划', '快速找到游览方向', '路神——护佑出行', 'AI 智能路线推荐'],
  ['导览导航', '顺利抵达景点', '引路文化寓意', '神祇引导式导航'],
  ['景点讲解', '理解文化故事', '神祇体系、民俗故事', 'AI 文化讲解'],
  ['互动体验', '增强参与感', '祈福文化', '数字福印收集'],
  ['游览结束', '留下文化记忆', '甲马祈福寓意', 'AI 生成文化纪念卡'],
]

const aiIn = ['“我只有 2 小时怎么玩？”', '“我带着老人来游玩。”', '“附近哪里有母婴室？”']
const aiUnderstand = ['游玩时间', '游客类型', '兴趣偏好', '同行人', '实时位置']
const aiOut = ['个性化路线规划', '景点推荐', '神祇文化讲解', '公共服务提醒', '动态导航建议']
const aiRules = [['信息复杂', 'AI 整理信息'], ['需求模糊', 'AI 理解需求'], ['服务分散', 'AI 主动连接']]

const ia: { t: string; core?: boolean; kids: string[] }[] = [
  { t: 'AI 智能导览', core: true, kids: ['AI 路线规划', 'AI 文化问答', 'AI 语音助手', 'AI 行程推荐'] },
  { t: '智慧导览', kids: ['景点地图', '推荐路线', '实时导航', '服务设施'] },
  { t: '文化探索', kids: ['甲马文化', '神祇体系', '制作技艺', '数字福印'] },
  { t: '公共服务', kids: ['厕所', '停车场', '母婴室', '无障碍设施', '游客中心'] },
  { t: '我的', kids: ['收藏', '福印册', '游览记录', '分享'] },
]

const logic = [
  ['甲马文化研究', ''], ['用户研究', 'User Research'], ['Persona', '用户画像'], ['用户需求分析', 'User Needs'], ['用户旅程地图', 'Journey Map'],
  ['文化触点分析', 'Culture Touchpoint'], ['AI 服务策略', 'AI Strategy'], ['信息架构', 'IA'], ['UI 设计', 'Design System & Interface'],
]

export default function UXFlow() {
  return (
    <>
      <div className="mt-16">
        <SubHead k="E" cn="用户旅程地图" en="Journey map · 情绪走向为示意" />
        <div className="relative">
          <div aria-hidden className="xz-curve hidden lg:block">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
              <polyline vectorEffect="non-scaling-stroke" fill="none" stroke="#d9301f" strokeWidth="2.5" strokeLinejoin="round" points={stages.map((s, i) => `${10 + i * 20},${s.y}`).join(' ')} />
            </svg>
            {stages.map((s, i) => (
              <span key={s.s} className="xz-dot" style={{ left: `${10 + i * 20}%`, top: `${s.y}%` }}><b>{s.mood}</b></span>
            ))}
          </div>
          <ol className="grid list-none gap-4 lg:grid-cols-5">
            {stages.map((s, i) => (
              <motion.li key={s.s} {...fade} transition={{ ...fade.transition, delay: i * 0.07 }} className="xz-card relative p-4 pb-0">
                <p className="font-display text-[10px] tracking-widest text-[var(--xz-cinnabar)]">STAGE {String(i + 1).padStart(2, '0')}</p>
                <h4 className="xz-serif text-xl font-black">{s.s}</h4>
                <dl className="mt-3 space-y-2 text-[13px] leading-6">
                  <div><dt className="inline opacity-60">用户行为　</dt><dd className="inline font-bold">{s.act}</dd></div>
                  <div className="lg:hidden"><dt className="inline opacity-60">用户情绪　</dt><dd className="inline font-bold text-[var(--xz-cinnabar)]">{s.mood}</dd></div>
                  <div><dt className="opacity-60">痛点</dt><dd className="font-bold">{s.pain}</dd></div>
                  <div className="-mx-4 mt-3 bg-[var(--xz-orange)] px-4 py-3"><dt className="text-[11px] font-black opacity-70">设计机会</dt><dd className="font-black">{s.opp}</dd></div>
                </dl>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-16">
        <SubHead k="F" cn="文化触点分析" en="与旅程结合" />
        <div className="grid gap-4 lg:grid-cols-3">
          {touch.map((c, i) => (
            <motion.div key={c.t} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} className="xz-touch">
              <p className="font-display text-[10px] tracking-widest opacity-60">{String(i + 1).padStart(2, '0')} · {c.en}</p>
              <h4 className="xz-serif text-2xl font-black">{c.t}</h4>
              <ul className="mt-4 space-y-3 text-[13px] leading-6">
                {c.body.map(([k, v]) => (<li key={k}><b className="text-[var(--xz-cinnabar)]">{k}</b><br />{v}</li>))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div {...fade} className="mt-6 overflow-x-auto">
          <table className="xz-table">
            <caption className="sr-only">公共服务场景与用户需求、甲马文化转译、数字体验设计对照</caption>
            <thead><tr><th scope="col">公共服务场景</th><th scope="col">用户需求</th><th scope="col">甲马文化转译</th><th scope="col">数字体验设计</th></tr></thead>
            <tbody>{matrix.map((r) => (<tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td><td className="font-bold">{r[3]}</td></tr>))}</tbody>
          </table>
        </motion.div>
        <motion.p {...fade} className="xz-p mt-5 border-l-[3px] border-[var(--xz-cinnabar)] pl-4 text-sm font-bold leading-7">设计原则：甲马文化不是作为视觉装饰，而是作为公共服务体验中的文化触点，自然融入用户游览全过程。</motion.p>
      </div>

      <div className="mt-16">
        <SubHead k="G" cn="AI 服务策略（例）" en="AI guide assistant" />
        <div className="xz-ai">
          <motion.div {...fade} className="xz-card p-5"><p className="font-display text-[10px] tracking-widest opacity-60">用户输入</p><ul className="xz-serif mt-3 space-y-2 text-base font-black">{aiIn.map((x) => <li key={x}>{x}</li>)}</ul></motion.div>
          <span aria-hidden className="xz-ai-arrow">→</span>
          <motion.div {...fade} className="xz-card p-5"><p className="font-display text-[10px] tracking-widest opacity-60">AI 理解 · 分析用户</p><ul className="mt-3 flex flex-wrap gap-2">{aiUnderstand.map((x) => <li key={x} className="xz-chip">{x}</li>)}</ul></motion.div>
          <span aria-hidden className="xz-ai-arrow">→</span>
          <motion.div {...fade} className="xz-dark rounded-2xl p-5"><p className="font-display text-[10px] tracking-widest text-[var(--xz-orange)]">AI 输出 · 生成</p><ul className="mt-3 space-y-1.5 text-sm font-bold">{aiOut.map((x) => <li key={x}>· {x}</li>)}</ul></motion.div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[1.1fr_1fr]">
          <motion.p {...fade} className="xz-serif text-lg font-black leading-8 md:text-xl">AI 并非替代用户决策，而是帮助用户<span className="text-[var(--xz-cinnabar)]">降低信息获取成本</span>。</motion.p>
          <ul className="grid gap-2">{aiRules.map(([a, b]) => (<motion.li key={a} {...fade} className="xz-rule-row"><span>{a}</span><i aria-hidden>→</i><b>{b}</b></motion.li>))}</ul>
        </div>
      </div>

      <div className="mt-16">
        <SubHead k="H" cn="信息架构 IA" en="Information architecture" />
        <motion.div {...fade} className="xz-ia">
          <div className="xz-ia-root"><span>首页</span></div>
          <ul className="xz-ia-branches">
            {ia.map((b) => (
              <li key={b.t}>
                <p className={b.core ? 'xz-ia-b xz-ia-core' : 'xz-ia-b'}>{b.t}{b.core && <small>核心入口</small>}</p>
                <ul>{b.kids.map((k) => <li key={k}>{k}</li>)}</ul>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="mt-16">
        <SubHead k="I" cn="最终 UX 逻辑链" en="From culture to interface" />
        <ol className="xz-logic list-none">
          {logic.map(([t, en], i) => (
            <motion.li key={t} {...fade} className={i === logic.length - 1 ? 'is-last' : ''}>
              <span className="xz-no text-lg">{String(i + 1).padStart(2, '0')}</span>
              <b className="xz-serif text-lg font-black">{t}</b>
              {en && <small className="font-display text-[10px] tracking-widest opacity-60">{en}</small>}
            </motion.li>
          ))}
        </ol>
      </div>
    </>
  )
}
