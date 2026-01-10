"use client"

import { useState, useEffect, useRef } from "react"

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true)
    }
  }, [])

  const speak = (text: string, lang: string = 'zh-CN') => {
    if (!isSupported) {
      console.warn('Speech synthesis is not supported')
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 1
    utterance.pitch = 1

    utterance.onstart = () => {
      setIsSpeaking(true)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const stop = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const pause = () => {
    if (isSpeaking) {
      window.speechSynthesis.pause()
    }
  }

  const resume = () => {
    if (isSpeaking) {
      window.speechSynthesis.resume()
    }
  }

  return {
    isSpeaking,
    isSupported,
    speak,
    stop,
    pause,
    resume,
  }
}
