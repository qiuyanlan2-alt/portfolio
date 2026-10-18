export const roseProcess = [
  { en: 'PROCESS CONCEPT', cn: '构思主题' },
  { en: 'STORY', cn: '建立故事线' },
  { en: 'GENERATE', cn: 'AI 生图' },
  { en: 'MOTION', cn: '图生视频' },
  { en: 'TYPE', cn: '字体生成' },
  { en: 'COMPOSITE', cn: '字体 × 视频' },
]

export interface RoseScene {
  no: string
  stage: string
  name: string
  title: string
  image: string
  prompt: string
}

// Image prompts used for each key frame (9:16). Edit text here; nothing else needs to change.
export const roseScenes: RoseScene[] = [
  {
    no: '第1张',
    stage: 'AWAKEN',
    name: '玫瑰城堡',
    title: '开场俯瞰全景',
    image: '/rose/s1-castle.jpg',
    prompt:
      '鸟瞰视角，夜晚，一座被无边玫瑰花海包围的蒸汽朋克城堡，砖红色圆形塔楼顶部盛开着巨大的深红色和粉红色玫瑰，地面铺满玫瑰花，深紫蓝色星空，远处有一颗流星划过，低处有薄薄的粉色雾气，3D渲染，超精细，奢华梦幻风格，电影级画质，竖版9:16',
  },
  {
    no: '第2张',
    stage: 'ENERGY',
    name: '魔法光束',
    title: '魔法光束穿城',
    image: '/rose/s2-orb.jpg',
    prompt:
      '仰视角度，两座巨大的蒸汽朋克玫瑰塔楼之间，粉色和白色魔法能量光束在空中螺旋飞舞，玫瑰花瓣随风飘散，发光粒子漫天飞舞，紫色体积光从建筑缝隙穿透，极度华丽，电影特效风格，3D渲染，超高清，竖版9:16',
  },
  {
    no: '第3张',
    stage: 'CORE',
    name: '水晶核心',
    title: '水晶星盘玫瑰特写',
    image: '/rose/s3-core.jpg',
    prompt:
      '近景特写，一个巨大的水晶星盘仪放置在雕花石台上，内部封印着一朵发着粉白色光芒的玫瑰花，金属圆环层层嵌套高速旋转，周围有粉色魔法能量缠绕闪烁，背景是模糊的玫瑰花园和深蓝夜空，超精细3D渲染，魔幻奇幻风格，电影级光效，竖版9:16',
  },
  {
    no: '第4张',
    stage: 'TRANSFORM',
    name: '能量爆发',
    title: '爆炸冲击波瞬间',
    image: '/rose/s4-burst.jpg',
    prompt:
      '水晶球在画面中央发生白色光爆炸，巨大冲击波向四面八方炸裂扩散，玫瑰花瓣和金色光粒子被炸飞，强烈的白色耀斑和镜头光晕，运动模糊，中心极亮向外渐暗，背景蒸汽朋克城市剪影，粉色和金色碎片漫天飞舞，极度震撼，电影级视觉特效，竖版9:16',
  },
  {
    no: '第5张',
    stage: 'UPGRADE',
    name: '玫瑰之城',
    title: '史诗结尾全景',
    image: '/rose/moon-city.jpg',
    prompt:
      '宏大远景，一座蒸汽朋克玫瑰工厂城市，背后有超巨大的满月光晕笼罩，城市每个角落都覆盖着盛开的玫瑰，工业烟囱和齿轮与花朵交错，粉色烟雾和水汽弥漫，深紫蓝星空中有流星划过，建筑内透出温暖金色灯光，极度奢华梦幻，史诗级电影构图，3D渲染超高清，竖版9:16',
  },
]

export const roseVideo = { src: '/videos/rose-upgrade.mp4', poster: '/rose/s1-castle.jpg' }

export const roseBrief =
  '以“玫瑰升级”为主题，将玫瑰、蒸汽朋克建筑与魔法能量融合，构建从玫瑰城堡到玫瑰机械城市的视觉叙事。通过 AI 生图、图生视频与字体生成，将静态视觉逐步转化为动态 MP4 特效。'

export const roseTypes = [
  { word: '恭喜升级', type: '/rose/type-congrats.png', frame: '/rose/final-congrats.jpg', note: '升级礼赞 · 花瓣与金粉环绕' },
  { word: '感谢有你', type: '/rose/type-thanks.png', frame: '/rose/final-thanks.jpg', note: '答谢字幕 · 月夜玫瑰城' },
]
