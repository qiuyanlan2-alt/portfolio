// Central site copy. Edit here; pages read from this file only.

export const profile = {
  nameCn: '邱彦岚',
  nameEn: 'Yanlan Qiu',
  role: 'Technical Artist × UXUI',
  years: '2004.11.20',
  tagline: '设计始于好奇，生于创造，最终抵达真实的世界。',
  lead: '视觉设计 · AI 视觉 · 技术美术 · 交互体验。目前在百度 YY AI 技术组做直播视觉特效，广西师范大学视觉传达设计 2027 届。',
  email: '18977578607@163.com',
  // Shown only in the About page contact card. Delete both lines (and the card) to hide.
  phone: '18977578607',
  wechat: 'hh18977578607',
  birthday: '2004.11.20',
  github: 'https://github.com/qiuyanlan2-alt',
  githubName: 'qiuyanlan2-alt',
  school: '广西师范大学 · 视觉传达设计',
  schoolShort: '广西师范大学',
  major: '视觉传达设计',
  schoolTerm: '2023.09 - 2027.06',
  schoolNote: 'GPA 3.73/4.0 · 专业排名 15/120',
  // Put your photo at web/public/images/profile.jpg (portrait 3:4 works best).
  photo: '/images/profile.jpg',
}

export const intro = [
  '我喜欢从一个念头出发，探索它是否终能抵达那里。',
  '可能是一幅画面、一层交互，也可能是一个尚未成形的想法。我享受观察、思考与创造的过程，也着迷于那些原本只存在于想象中的事物，如何一步步成为真实的体验。',
  '从视觉设计到 UX/UI，再到 AI 与技术美术，我不断尝试用不同的方式理解设计。在我看来，视觉让想法被看见，体验让设计与人产生联系，而技术让想法有更多实现的可能。',
  '我不想让自己停留在某一种表达方式里。比起寻找一个固定的答案，我更愿意保持好奇，跨越边界，不断尝试新的可能。',
]

export const nav = [
  { to: '/', label: '首页', en: 'Home' },
  { to: '/about', label: '关于', en: 'About' },
  { to: '/projects', label: '作品', en: 'Works' },

  { to: '/experience', label: '经历', en: 'Experience' },
  { to: '/contact', label: '联系', en: 'Contact' },
]

export const contents = [
  { part: 'PART 1', title: 'YY LIVE', sub: 'MP4 / UI / 美妆', to: '/projects?c=yy' },
  { part: 'PART 2', title: 'KORA 404', sub: '游戏企划 / 概念设计', to: '/projects?c=game' },
  { part: 'PART 3', title: '心灯计划', sub: 'UXUI', to: '/projects?c=uxui' },
  { part: 'PART 4', title: '其他', sub: '个人插画', to: '/projects?c=art' },
]

export interface Job {
  when: string
  company: string
  role: string
  points: string[]
}

export const jobs: Job[] = [
  {
    when: '2026.06 - 2026.10',
    company: '百度 YY',
    role: 'AI 技术组 · 技术美术实习生',
    points: [
      '参与 AI 技术团队的直播视觉特效生产，运用 AI 生成与图形变换技术完成 MP4 自定义特效及视觉效果制作，参与从需求理解、方案设计到效果交付的完整流程。',
      '独立 1v1 对接并完成 3 单定制需求，从 0 到 1 快速学习内部工具及特效制作流程，在较短周期内完成视觉方案落地与交付。',
      '个人制作特效产生的营收约占小组同期营收 30%；所在小组 Q3 营收较 Q2 提升约 100%。',
      '基于业务反馈持续优化特效表现，参与视觉质量检查、需求调整及项目推进。',
    ],
  },
  {
    when: '2025.12 - 2026.02',
    company: '中通快递',
    role: '视觉设计实习生',
    points: [
      '参与企业品牌及运营视觉设计，负责宣传物料、活动视觉等内容的设计与落地。',
      '根据业务需求完成视觉构思、素材制作及成品交付，协作推进多类型商业视觉项目。',
    ],
  },
]

export const sideProjects: Job[] = [
  {
    when: '2026.09 - 至今',
    company: '喜洲古镇数字文化导览',
    role: '交互设计 / 数字体验 · 进行中',
    points: [
      '负责用户场景、信息架构及地图导览设计，完成核心 UI 与交互方案。',
      '提取甲马纹样、当地建筑特征，结合 Figma、Unity、AI 完成视觉设计，探索地图 VR、人脸互动等体验。',
    ],
  },
  {
    when: '2026',
    company: '抖音自动回复系统',
    role: '个人开发项目',
    points: [
      '独立完成需求拆解、功能设计及开发调试，建立从用户触发、信息处理到自动回复的完整流程。',
      '将 AI 能力与自动化逻辑结合，探索内容识别、回复生成及任务自动执行；通过 GitHub 管理代码与开发记录。',
    ],
  },
  {
    when: '2025',
    company: '大学生创新训练计划',
    role: '主创成员 · 国家级立项',
    points: [
      '实地调研 5 个村落、访谈 20+ 户农户，参与产业信息整理与视觉呈现。',
      '使用 Blender、AI 数据可视化工具完成 10+ 套分析图表，成果被当地政府采纳。',
    ],
  },
]

export const skills = [
  { group: 'AI 视觉', items: ['AI 图像/视频生成', '图像编辑', 'Prompt', 'AI 工作流'] },
  { group: '视觉与动效', items: ['UI/UX', '品牌视觉', '2D/3D 特效', '动态视觉'] },
  { group: '技术与交互', items: ['C#', 'Git/GitHub', 'AI API', '自动化流程'] },
  {
    group: '工具',
    items: ['Photoshop', 'Illustrator', 'After Effects', 'Premiere', 'InDesign', 'Blender', 'Rhino', 'Figma', 'Unity', 'Canva', '剪映'],
  },
  { group: '语言', items: ['CET-4', 'TOPIK II'] },
]

export const honors = [
  { year: '2025', text: 'iCAN 大学生创新创业大赛 AI 全国挑战赛', prize: '国家一等奖' },
  { year: '2025', text: '大学生创新训练计划', prize: '国家级立项' },
  { year: '2024', text: '中国国际大学生创新大赛', prize: '省赛铜奖' },
  { year: '第十六届', text: '蓝桥杯 AICG 影像赛道', prize: '省级一等奖' },
  { year: '在校', text: '五好学生 · 优秀学生干部', prize: '' },
]
