import fs from 'fs'
import path from 'path'

export async function generateScript(topic: string): Promise<string> {
  // If OpenAI API key is available, use it
  if (process.env.OPENAI_API_KEY) {
    try {
      const OpenAI = require('openai').default
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a viral short-form video script writer. Create engaging 30-second scripts for faceless videos that explain trending topics in an exciting way.'
          },
          {
            role: 'user',
            content: `Write a 30-second script about: ${topic}. Make it engaging and perfect for a faceless video with text overlays. Keep it under 100 words.`
          }
        ],
        max_tokens: 200
      })

      return response.choices[0].message.content || generateFallbackScript(topic)
    } catch (error) {
      console.error('OpenAI API error:', error)
      return generateFallbackScript(topic)
    }
  }

  return generateFallbackScript(topic)
}

function generateFallbackScript(topic: string): string {
  return `Did you know about ${topic}? This is one of the hottest trends right now! Let's break it down. This topic is taking the world by storm, and here's why it matters. The impact is huge and everyone is talking about it. Stay tuned for more updates on this trending topic!`
}

export async function createVideo(script: string, topic: string): Promise<string> {
  const outputDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Generate HTML template for video content
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1080, height=1920">
  <style>
    body {
      margin: 0;
      width: 1080px;
      height: 1920px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 100px;
      box-sizing: border-box;
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    h1 {
      font-size: 72px;
      text-align: center;
      margin-bottom: 100px;
    }
    p {
      font-size: 48px;
      text-align: center;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <h1>${topic.substring(0, 60)}</h1>
  <p>${script}</p>
</body>
</html>
  `

  const htmlPath = path.join(outputDir, 'video-template.html')
  fs.writeFileSync(htmlPath, htmlContent)

  // Create a JSON metadata file
  const metadata = {
    topic,
    script,
    duration: 30,
    format: 'vertical',
    resolution: '1080x1920',
    created: new Date().toISOString()
  }

  const metadataPath = path.join(outputDir, 'video-metadata.json')
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))

  return '/video-template.html'
}
