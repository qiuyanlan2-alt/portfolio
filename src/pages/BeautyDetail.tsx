import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTitle } from '../components/ui'
import './beauty.css'

const asset = (name: string | number) => `/beauty/${name}.png`
const layers = [
  { id: 4, name: '柔雾眉', en: 'BROWS', x: 18, y: 26, w: 65, h: 12, strength: 55 },
  { id: 8, name: '玫瑰眼影', en: 'EYESHADOW', x: 20, y: 29, w: 61, h: 18, strength: 35 },
  { id: 7, name: '细致眼线', en: 'EYELINER', x: 12, y: 24, w: 76, h: 22, strength: 65 },
  { id: 6, name: '卧蚕提亮', en: 'UNDER EYES', x: 24, y: 32, w: 53, h: 16, strength: 45 },
  { id: 5, name: '蜜桃腮红', en: 'BLUSH', x: 14, y: 21, w: 73, h: 58, strength: 28 },
  { id: 10, name: '立体修容', en: 'CONTOUR', x: 13, y: 21, w: 75, h: 58, strength: 22 },
  { id: 11, name: '水光高光', en: 'HIGHLIGHT', x: 14, y: 21, w: 73, h: 58, strength: 25 },
  { id: 12, name: '柔棕美瞳', en: 'CONTACTS', x: 10, y: 32, w: 80, h: 12, strength: 45 },
]
const initialSettings = () => layers.map(layer => ({ enabled: false, strength: layer.strength, x: 0, y: 0, scale: 100 }))

export default function BeautyDetail() {
  useTitle('顶美骨相脸 · Beauty Effect')
  const [settings, setSettings] = useState(initialSettings)
  const [selected, setSelected] = useState(0)
  const [split, setSplit] = useState(50)
  const [mode, setMode] = useState<'makeup' | 'original'>('makeup')
  const active = settings[selected]
  const count = settings.filter(s => s.enabled).length
  const update = (patch: Partial<typeof active>) => setSettings(values => values.map((value, index) => index === selected ? { ...value, ...patch } : value))
  const reset = () => { setSettings(initialSettings()); setSelected(0); setSplit(50); setMode('makeup') }

  return (
    <article className="beauty-page">
      <header className="beauty-hero">
        <img className="beauty-hero-photo" src={asset(1)} alt="粉调水光妆容与骨相塑造主视觉" fetchPriority="high" />
        <div className="beauty-hero-top">
          <div><Link to="/projects?c=yy" className="beauty-back">← 返回作品 / YY LIVE</Link>
            <h1>[顶美骨相脸]</h1><p className="beauty-subtitle">美颜 · 美妆 · 人脸整形</p>
            <p className="beauty-kicker">BEAUTY / MAKEUP / FACE SCULPTING</p>
          </div>
          <div className="beauty-number">03<span>BEAUTY<br />EFFECT</span></div>
        </div>
        <a className="beauty-hero-action" href="#beauty-studio">亲手叠一层妆效 <span>↘</span></a>
        <span className="beauty-hero-credit">TECHNICAL ART / YY LIVE / 2026</span>
      </header>

      <div className="beauty-body">
        <div className="beauty-intro beauty-wrap">
          <span className="beauty-kicker">THE IDEA</span>
          <p>让骨相成为底色，<br />让妆容恰好发生。</p>
          <div>围绕「骨相优化」，将美颜、美妆与人脸整形融合于同一套人脸特效。从面部视觉资产拆分、妆容素材制作，到遮罩与特效资产搭建，探索细微变化如何塑造面部质感。</div>
        </div>

        <section className="beauty-wrap beauty-assets" aria-labelledby="beauty-assets-title">
          <div className="beauty-section-title"><span>01 / BREAKDOWN</span><h2 id="beauty-assets-title">人脸视觉资产拆解</h2><p>FACIAL EFFECT ASSETS</p></div>
          <div className="beauty-assets-feature">
            {[{ id: 5, label: 'COLOR / 色彩' }, { id: 11, label: 'LIGHT / 提亮' }, { id: 10, label: 'SCULPT / 轮廓' }].map(item => (
              <figure key={item.id}><img src={asset(item.id)} alt={item.label} loading="lazy" /><figcaption>{item.label}</figcaption></figure>
            ))}
          </div>
          <div className="beauty-flow">Face <span>→</span> Mask <span>→</span> Asset <span>→</span> Effect</div>
          <div className="beauty-texture-grid">
            {layers.map(layer => <figure key={layer.id}><img src={asset(layer.id)} alt={`${layer.name}原始透明贴图`} loading="lazy" /><figcaption>{layer.name}<small>{layer.en}</small></figcaption></figure>)}
            {[3, 9].map((id, i) => <figure key={id}><img src={asset(id)} alt={i ? '珊瑚粉色彩素材' : '浅粉色彩素材'} loading="lazy" /><figcaption>{i ? '珊瑚粉' : '浅樱粉'}<small>COLOR SAMPLE</small></figcaption></figure>)}
          </div>
        </section>

        <section id="beauty-studio" className="beauty-wrap beauty-studio" aria-labelledby="beauty-studio-title">
          <div className="beauty-section-title"><span>02 / PLAY WITH BEAUTY</span><h2 id="beauty-studio-title">你的妆容，由你叠加。</h2><p>THE MAKEUP LAB</p></div>
          <div className="beauty-studio-heading"><p>选择妆效，调整浓度。拖动滑杆，看见改变。</p><div className="beauty-mode" aria-label="预览模式">
            <button aria-pressed={mode === 'makeup'} onClick={() => setMode('makeup')}>手动试妆</button>
            <button aria-pressed={mode === 'original'} onClick={() => setMode('original')}>原始效果对比</button>
          </div></div>
          <div className="beauty-workbench">
            <div>
              <div className="beauty-compare">
                <img className="beauty-face" src={asset('before')} alt="原始人像，未添加妆效" />
                <div className="beauty-result" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
                  {mode === 'original' ? <img className="beauty-face" src={asset('after')} alt="提供素材中的最终效果" /> :
                    settings.map((setting, i) => setting.enabled && <img key={layers[i].id} className="beauty-layer" src={asset(layers[i].id)} alt="" style={{
                      left: `${layers[i].x + setting.x}%`, top: `${layers[i].y + setting.y}%`,
                      width: `${layers[i].w}%`, height: `${layers[i].h}%`,
                      opacity: setting.strength / 100, transform: `scale(${setting.scale / 100})`,
                    }} />)}
                </div>
                <span className="beauty-photo-label before">BEFORE</span><span className="beauty-photo-label after">{mode === 'original' ? 'AFTER' : 'YOUR LOOK'}</span>
                <div className="beauty-divider" style={{ left: `${split}%` }} aria-hidden="true"><span>↔</span></div>
                <input className="beauty-photo-range" aria-label="前后对比分界" type="range" min="0" max="100" value={split} onChange={e => setSplit(Number(e.target.value))} />
              </div>
              <label className="beauty-comparison-control">前后对比 <output>{split}% / {100 - split}%</output>
                <input aria-label="前后对比滑杆" type="range" min="0" max="100" value={split} onChange={e => setSplit(Number(e.target.value))} />
              </label>
              <p className="beauty-note">{mode === 'makeup' ? '左侧为原图，右侧为你的叠妆。固定照片手动贴图预览，不使用人脸识别。' : '使用提供的同一张前后对比素材裁切展示；原始拍摄存在轻微姿态差异。'}</p>
            </div>
            <div className="beauty-controls">
              <div className="beauty-controls-title"><span>MAKEUP PALETTE</span><span aria-live="polite">已添加 {count} / {layers.length}</span></div>
              <fieldset disabled={mode === 'original'}>
                <legend className="sr-only">手动妆效设置</legend>
                <div className="beauty-palette">{layers.map((layer, i) => <button key={layer.id} className={selected === i ? 'selected' : ''} aria-pressed={settings[i].enabled} onClick={() => { setSelected(i); setSettings(values => values.map((v, j) => j === i ? { ...v, enabled: !v.enabled } : v)) }}>
                  <img src={asset(layer.id)} alt="" /><span>{layer.name}</span><b>{settings[i].enabled ? '−' : '+'}</b>
                </button>)}</div>
                <div className="beauty-adjust">
                  <div><strong>{layers[selected].name}</strong><button onClick={() => update({ enabled: !active.enabled })}>{active.enabled ? '移除这层' : '添加这层'}</button></div>
                  <label>妆效浓度 <output>{active.strength}%</output><input aria-label="妆效浓度" type="range" min="0" max="100" value={active.strength} onChange={e => update({ strength: Number(e.target.value) })} /></label>
                  <details><summary>微调贴合位置</summary>
                    {(['x', 'y', 'scale'] as const).map((key, i) => <label key={key}>{['水平位置', '垂直位置', '缩放'][i]} <output>{active[key]}{key === 'scale' ? '%' : ''}</output><input aria-label={['水平位置', '垂直位置', '缩放'][i]} type="range" min={key === 'scale' ? 70 : -15} max={key === 'scale' ? 130 : 15} value={active[key]} onChange={e => update({ [key]: Number(e.target.value) })} /></label>)}
                  </details>
                </div>
                <button className="beauty-preset" onClick={() => setSettings(initialSettings().map((value, i) => ({ ...value, enabled: [0, 1, 4, 6].includes(i) })))}>一键试试 · 清透玫瑰妆</button>
              </fieldset>
              {mode === 'original' && <p className="beauty-note">当前展示原始成片。切回「手动试妆」即可继续编辑，已选妆效会保留。</p>}
              <button className="beauty-reset" onClick={reset}>重置全部</button>
            </div>
          </div>
        </section>
        <footer className="beauty-end beauty-wrap"><p>一点点改变，<br /><span>恰到好处的自己。</span></p><small>FINAL BEAUTY / YY LIVE / 2026</small><nav aria-label="项目切换"><Link to="/projects/live-ui">← 定制直播 UI</Link><Link to="/projects">全部作品</Link><Link to="/projects/kora-404">KORA 404 →</Link></nav></footer>
      </div>
    </article>
  )
}
