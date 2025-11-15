import { NextResponse } from 'next/server'
import { generateScript, createVideo } from '@/lib/video-generator'

export async function POST() {
  try {
    // Fetch a trending topic
    const trendsRes = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/trends`)
    const trendsData = await trendsRes.json()
    const topic = trendsData.trends[0] || 'Technology trends in 2025'

    // Generate script using AI
    const script = await generateScript(topic)

    // Create video from script
    const videoPath = await createVideo(script, topic)

    return NextResponse.json({
      success: true,
      videoUrl: videoPath,
      topic,
      script
    })
  } catch (error) {
    console.error('Error generating video:', error)
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    }, { status: 500 })
  }
}
