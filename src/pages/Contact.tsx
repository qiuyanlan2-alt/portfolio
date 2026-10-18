import { useState } from 'react'
import { Reveal, useTitle } from '../components/ui'
import { profile } from '../data/site'

export default function Contact() {
  useTitle('联系')
  const [copied, setCopied] = useState(false)
  const [phoneCopied, setPhoneCopied] = useState(false)

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(profile.phone)
      setPhoneCopied(true)
      setTimeout(() => setPhoneCopied(false), 2000)
    } catch {
      /* clipboard blocked: the number is on screen to copy by hand */
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="wrap min-h-[70vh] pb-10 pt-12 md:pt-20">
      <Reveal>
        <p className="label">Contact</p>
        <h1 className="mt-3 font-display text-6xl leading-[0.95] md:text-9xl">
          SAY
          <br />
          <span className="text-red">HELLO.</span>
        </h1>
      </Reveal>
      <Reveal delay={0.1} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border-2 border-ink bg-ink p-8 text-paper shadow-[8px_8px_0_#e0222d]">
          <p className="label">Email</p>
          <a href={`mailto:${profile.email}`} className="mt-3 block break-all text-2xl font-black hover:text-red md:text-3xl">
            {profile.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-red">
              发送邮件
            </a>
            <button type="button" onClick={copy} className="btn !border-paper !bg-transparent !text-paper hover:!bg-paper hover:!text-ink" aria-live="polite">
              {copied ? '已复制 ✓' : '复制邮箱'}
            </button>
          </div>
        </div>
        <div className="border-2 border-ink p-8">
          <p className="label">Tel</p>
          <a href={`tel:${profile.phone}`} className="mt-3 block break-all text-2xl font-black hover:text-red md:text-3xl">
            {profile.phone}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:${profile.phone}`} className="btn btn-red">
              拨打电话
            </a>
            <button type="button" onClick={copyPhone} className="btn" aria-live="polite">
              {phoneCopied ? '已复制 ✓' : '复制号码'}
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
