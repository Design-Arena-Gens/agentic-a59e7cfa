import { NextResponse } from 'next/server'
import { generateScript, createVideo } from '@/lib/video-generator'
import { uploadToYouTube } from '@/lib/youtube-uploader'

export async function POST() {
  try {
    // Step 1: Fetch trends
    const trendsRes = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/trends`)
    const trendsData = await trendsRes.json()
    const trends = trendsData.trends
    const topic = trends[0] || 'Technology trends in 2025'

    // Step 2: Generate script
    const script = await generateScript(topic)

    // Step 3: Create video
    const videoPath = await createVideo(script, topic)

    // Step 4: Upload to YouTube
    const title = `${topic.substring(0, 80)} | Trending Now`
    const description = `${script.substring(0, 200)}...\n\nThis video was automatically generated to cover trending topics.\n\n#trending #viral #automation`

    const videoId = await uploadToYouTube(videoPath, title, description)

    return NextResponse.json({
      success: true,
      trends,
      topic,
      videoUrl: videoPath,
      videoId
    })
  } catch (error) {
    console.error('Error running full pipeline:', error)
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    }, { status: 500 })
  }
}
