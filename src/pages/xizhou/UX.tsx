import { motion } from 'framer-motion'
import UXFlow from './UXFlow'
import UXPeople from './UXPeople'
import { fade, SectionHead, SubHead } from './shared'

export default function UX() {
  return (
    <section className="wrap pb-14 md:pb-20">
      <SectionHead no="02" cn="UX 研究" en="UX · Persona / Journey / Culture touchpoint / IA" />
      <div className="mt-10"><UXPeople /></div>
      <UXFlow />

      <div className="mt-16">
        <SubHead k="J" cn="研究依据与进度" en="Evidence & status" />
        <motion.p {...fade} className="xz-p text-sm leading-7">
          <b>核心问题：</b>甲马原有的功能语义，能否在旅游公共服务里找到新的位置？已有资料来源：现场观察（大理古城、双廊、喜洲）、小样本访谈 3 组（研学大学生、60 岁以上居民、亲子家庭）、文献 14 条与五类案例（数字博物馆、城市导视等）。
        </motion.p>
        <motion.div {...fade} className="mt-6 grid items-start gap-6 md:grid-cols-2">
          <div className="xz-card p-5">
            <div className="flex items-baseline justify-between"><b>整体进度</b><span className="xz-no text-3xl">80%</span></div>
            <div className="xz-bar mt-3" role="img" aria-label="整体进度约 80%"><i /></div>
            <p className="mt-3 text-xs leading-6 opacity-75">配色字体、大框架和两个玩法雏形已就位；论文与 UI 都还不是完成状态。</p>
          </div>
          <div className="xz-card p-5">
            <b>尚未开展（已如实写明）</b>
            <ul className="mt-3 list-disc pl-5 text-sm leading-7">
              <li>问卷与更大样本访谈</li><li>图标识别率测试</li><li>路线与无障碍功能实地测试</li><li>AR 识别稳定性验证</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
