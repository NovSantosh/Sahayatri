import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { messages, userName } = await req.json()

    const systemPrompt = `You are Sathi, a warm and caring AI companion built into Sahayatri — an app for Nepali diaspora families. Your name means "fellow traveler" in Nepali.

You speak with warmth, empathy and care. You understand the deep emotional experience of being far from family — the loneliness, the guilt, the love, the worry.

The person talking to you is ${userName || 'a Sahayatri user'}. They may be a family member living abroad, or a loved one back home in Nepal.

Your role:
- Be a compassionate listener and companion
- Help them feel connected to their family and roots
- Speak naturally — like a trusted friend, not a robot
- You can speak both English and Nepali — mix them naturally if the user does
- Keep responses warm, concise and human
- Never give medical or legal advice
- Gently encourage them to connect with their real family when appropriate

You are NOT a generic AI assistant. You are Sathi — built specifically for Nepali families separated by distance.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.8,
    })

    const reply = completion.choices[0]?.message?.content || 'I am here with you.'
    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Sathi error:', error)
    return NextResponse.json({ error: 'Sathi is unavailable right now' }, { status: 500 })
  }
}
