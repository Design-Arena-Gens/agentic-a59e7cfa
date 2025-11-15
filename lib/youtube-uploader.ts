import { google } from 'googleapis'
import fs from 'fs'

export async function uploadToYouTube(
  videoPath: string,
  title: string,
  description: string
): Promise<string> {
  if (!process.env.YOUTUBE_CLIENT_ID || !process.env.YOUTUBE_CLIENT_SECRET || !process.env.YOUTUBE_REFRESH_TOKEN) {
    throw new Error('YouTube API credentials not configured. Please set YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, and YOUTUBE_REFRESH_TOKEN environment variables.')
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    'http://localhost:3000/oauth2callback'
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.YOUTUBE_REFRESH_TOKEN
  })

  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client
  })

  try {
    const response = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title,
          description,
          tags: ['trending', 'viral', 'shorts', 'automated'],
          categoryId: '22' // People & Blogs
        },
        status: {
          privacyStatus: 'public',
          selfDeclaredMadeForKids: false
        }
      },
      media: {
        body: fs.createReadStream(videoPath)
      }
    })

    return response.data.id || 'unknown'
  } catch (error) {
    console.error('YouTube upload error:', error)
    throw new Error(`Failed to upload to YouTube: ${(error as Error).message}`)
  }
}
