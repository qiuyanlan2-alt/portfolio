// All project media and copy live here. To swap assets, change a path (or `src`
// of a video) — routes and layout read from this list and need no other edits.
import type { Category, CategoryId, MediaImage, Project } from './types'

const sheets = (id: string, count: number, alt: string): MediaImage[] =>
  Array.from({ length: count }, (_, i) => ({
    type: 'image' as const,
    src: `/work/${id}/${String(i + 1).padStart(2, '0')}.jpg`,
    alt: `${alt} ${i + 1}/${count}`,
  }))

/** Square 1200px list covers, one clean visual per project (public/covers/<slug>.jpg). */
const coverOf = (slug: string, alt: string): MediaImage => ({ type: 'image', src: `/covers/${slug}.jpg`, alt })

export const categories: Category[] = [
  { id: 'yy', label: 'YY LIVE', en: 'MP4 / UI / Beauty' },
  { id: 'game', label: '游戏企划', en: 'Game Concept' },
  { id: 'uxui', label: 'UXUI', en: 'Interaction' },
  { id: 'art', label: '个人创作', en: 'Illustration' },
]

export const projects: Project[] = [
  {
    slug: 'rose-upgrade',
    no: '01',
    title: '玫瑰升级',
    en: 'Rose Upgrade',
    category: 'yy',
    year: '2026',
    role: '技术美术 · 特效设计',
    tools: ['AI 生图', '图生视频', 'After Effects', '字体合成'],
    summary: '定制 MP4 礼物特效：从故事线到 AI 生图、图生视频，再与定制字体合成，完成「唤醒 → 能量 → 核心 → 转化 → 升级」的五幕升级演出。',
    accent: '#7b4ba6',
    cover: coverOf('rose-upgrade', '玫瑰升级封面：玫瑰蒸汽朋克城堡'),
    video: { type: 'video', src: '/videos/rose-upgrade.mp4', poster: '/rose/s1-castle.jpg', alt: '玫瑰升级 MP4 特效' },
    process: [
      { title: '构思主题', en: 'Concept', body: '确定「玫瑰 × 蒸汽机械」的主题与升级仪式感。' },
      { title: '建立故事线', en: 'Story', body: '拆成唤醒、能量、核心、转化、升级五幕分镜。' },
      { title: 'AI 生图', en: 'Generate', body: '统一镜头语言与色调，生成每一幕关键画面。' },
      { title: '图生视频', en: 'Motion', body: '让关键帧动起来，控制运镜与能量爆发节奏。' },
      { title: '字体 × 视频', en: 'Composite', body: '「恭喜升级」「感谢有你」定制字体与视频合成输出。' },
    ],
    facts: [
      { k: '幕数', v: '5' },
      { k: '交付', v: 'MP4' },
      { k: '主题字', v: '2' },
    ],
    sheets: sheets('rose', 4, '玫瑰升级 作品长图'),
  },
  {
    slug: 'live-ui',
    no: '02',
    title: '定制直播 UI',
    en: 'Custom Live UI',
    category: 'yy',
    year: '2026',
    role: 'UI 设计 · 角色融合',
    tools: ['AI 生图', 'Photoshop', 'After Effects'],
    summary: '为主播 1v1 定制头像框、对话气泡与个人主页，把主播形象和装饰语言转化为一整套具有游戏 UI 质感的直播视觉资产。',
    accent: '#2a6fb0',
    cover: coverOf('live-ui', '定制直播 UI 封面：夜空中坐在月牙上的月亮仙子'),
    process: [
      { title: '主播定制', en: 'Customized', body: '从主播的口述需求里提取「月亮、海水、星星」。' },
      { title: '头像框', en: 'Avatar Frame', body: '月牙造型作为识别锚点，反复迭代细节。' },
      { title: '角色融合', en: 'Integration', body: '把角色放入月牙与浪花，统一光感。' },
      { title: '直播视觉资产', en: 'Live Asset', body: '扩展成气泡、飘屏、主页背景等整套系统。' },
      { title: '需求转译', en: 'Brief → Visual', body: '把聊天里的描述准确翻译为画面。' },
    ],
    facts: [
      { k: '资产', v: '头像框 / 气泡 / 主页' },
      { k: '模式', v: '1v1 定制' },
    ],
    sheets: sheets('ui', 4, '定制直播 UI 作品长图'),
    extras: [
      { type: 'image', src: '/images/live-room-v2a.png', alt: '直播间效果图 A' },
      { type: 'image', src: '/images/live-room-v2b.png', alt: '直播间效果图 B' },
    ],
  },
  {
    slug: 'face-sculpting',
    no: '03',
    title: '顶美骨相脸',
    en: 'Beauty Effect',
    category: 'yy',
    year: '2026',
    role: '技术美术 · 美颜美妆特效',
    tools: ['Mask', '调色表 LUT', '3D 模型', 'Shader'],
    summary: '围绕「骨相优化」把美颜、美妆与人脸整形放进同一套人脸特效：从面部视觉资产拆分、妆容素材制作，到遮罩与 3D 模型等特效资产搭建。',
    accent: '#c26a82',
    cover: coverOf('face-sculpting', '顶美骨相脸封面：模特肖像'),
    video: { type: 'video', src: '', poster: '/work/beauty/04.jpg', alt: '美妆特效 Before / After' },
    process: [
      { title: 'Face', en: '人脸', body: '检测关键点，建立面部坐标。' },
      { title: 'Mask', en: '遮罩', body: '拆分眼、唇、鼻、面部区域遮罩。' },
      { title: 'Asset', en: '资产', body: '制作滤镜、牙齿、口红调色表和 3D 模型。' },
      { title: 'Effect', en: '效果', body: '合成最终效果并对比 Before / After。' },
    ],
    facts: [
      { k: '流程', v: 'Face → Mask → Asset → Effect' },
      { k: '资产', v: '2D / Mask / 3D' },
    ],
    sheets: sheets('beauty', 4, '顶美骨相脸 作品长图'),
  },
  {
    slug: 'kora-404',
    no: '04',
    title: 'KORA 404',
    en: 'Future Nagou Tribe Civilization',
    category: 'game',
    year: '2025',
    role: '游戏企划 · 视觉识别 · 角色设定',
    tools: ['AI 概念图', 'Illustrator', 'Photoshop'],
    summary: '从世界观出发，完成视觉识别、字体、角色设定与周边延展：机械与部落共生的未来纳苟文明。在校项目。',
    accent: '#b8893a',
    cover: coverOf('kora-404', 'KORA 404 封面：远行者与牦牛'),
    video: { type: 'video', src: '', poster: '/kora/front.jpg', alt: 'KORA 404 概念预告片' },
    process: [
      { title: 'Worldview', en: '世界观', body: '未来纳苟部落文明的设定与设计理念。' },
      { title: 'Identity', en: '视觉识别', body: '手绘草稿 → 矢量化 → AI 渲染的标志，以及符号与图标。' },
      { title: 'Font', en: '字体', body: '定制一套带部落纹样的金属质感字母与数字。' },
      { title: 'Role', en: '角色', body: '三类角色的正、侧、背设定。' },
      { title: 'Merch', en: '周边', body: '周边与展板延展。' },
    ],
    facts: [
      { k: '角色', v: '3' },
      { k: '模块', v: '世界观 / 识别 / 角色 / 周边' },
    ],
    sheets: sheets('kora', 6, 'KORA 404 作品长图'),
    extras: ['world', 'logo', 'symbol', 'icon', 'role1', 'role2', 'role3', 'goods'].map((n) => ({
      type: 'image' as const,
      src: `/kora/${n}.jpg`,
      alt: `KORA 404 ${n}`,
    })),
  },
  {
    slug: 'xizhou',
    no: '05',
    title: '喜洲古镇',
    en: 'Xizhou · Jiama New Voice',
    category: 'uxui',
    year: '2026',
    role: '本科毕业设计 · 交互与界面设计（进行中）',
    tools: ['UI 设计', '信息设计', 'AR 交互', '甲马视觉转译'],
    summary: '「甲马新语」白族甲马文化特色交互设计与公共服务界面：围绕喜洲古镇游客“找不到、看不懂、用不了”的现场问题，把公共服务与甲马文化放进同一套系统，并加入甲马上脸与地图 AR 两个玩法。进行中 / 毕业设计。',
    accent: '#e8a23c',
    cover: coverOf('xizhou', '喜洲古镇封面：浅绿底上的首页界面'),
    process: [
      { title: '观察与访谈', en: 'Observe', body: '现场观察大理古城、双廊、喜洲，小样本访谈 3 组。' },
      { title: '需求三层', en: 'Needs', body: '找不到、看不懂、用不了。' },
      { title: '甲马转译', en: 'Translate', body: '按导向、安全、健康、社区文化四类功能语义转译。' },
      { title: '界面实践', en: 'UI', body: '首页 / 地图 / 文化 / 我的 四栏目。' },
      { title: '新增玩法', en: 'Play', body: '甲马上脸、地图 AR 两个雏形。' },
    ],
    facts: [
      { k: '进度', v: '约 80%' },
      { k: '状态', v: '进行中 / 毕业设计' },
    ],
    sheets: [{ type: 'image', src: '/xizhou/p02.jpg', alt: '喜洲古镇 UI：首页' }],
  },
  {
    slug: 'light-within',
    no: '06',
    title: '心灯计划',
    en: 'Light Within',
    category: 'uxui',
    year: '2025',
    role: 'UX/UI 设计 · 3D 与 AI 视觉',
    tools: ['Figma', 'Blender', 'AI'],
    summary: '面向 18-30 岁青年的心理陪伴产品：从用户画像、需求与旅程，到信息架构、界面系统，再用 Blender 建模和 AI 渲染做出「心灯」的视觉。',
    accent: '#3a8fa8',
    cover: coverOf('light-within', '心灯计划封面：两台手机界面与 3D 心灯'),
    process: [
      { title: '用户研究', en: 'Research', body: '青年心理画像与设计机会点。' },
      { title: '产品结构', en: 'Structure', body: '信息架构、用户输入与生成逻辑。' },
      { title: '效果展示', en: 'Visual', body: '3D 建模 → AI 渲染 → AI 衍生。' },
      { title: '界面系统', en: 'UI System', body: '6 个核心页面、配色与字体设计。' },
    ],
    facts: [
      { k: '核心页面', v: '6' },
      { k: '人群', v: '18-30 岁' },
    ],
    sheets: sheets('light', 7, '心灯计划 作品长图'),
  },
  {
    slug: 'poems-of-the-sea',
    no: '07',
    title: '是插画',
    en: 'Poems of the Sea',
    category: 'art',
    year: '2024-2025',
    role: '个人创作 · 插画',
    tools: ['手绘', 'Procreate', '版画肌理'],
    summary: '海南、桂林、广州的片段：红、蓝、米白三色叠印的海岸与人物，像一本手写的旅行手账。',
    accent: '#c8302f',
    cover: coverOf('poems-of-the-sea', '是插画封面：红蓝三色版画海岸'),
    process: [
      { title: '采集', en: 'Collect', body: '旅途中的照片与记忆。' },
      { title: '压缩色彩', en: 'Limit', body: '只用红、蓝、米白三色。' },
      { title: '拼贴', en: 'Collage', body: '把版画肌理与手绘线稿拼成手账。' },
    ],
    facts: [
      { k: '色彩', v: '3' },
      { k: '地点', v: '海南 / 桂林 / 广州' },
    ],
    sheets: sheets('sea', 5, '是插画 作品长图'),
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id)!
export const videoProjects = projects.filter((p) => p.video)
