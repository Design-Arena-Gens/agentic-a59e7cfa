# 🎥 Trend Video Agent

An automated agent that discovers trending topics, generates short-form videos, and uploads them to YouTube with zero manual intervention.

## Features

- 📊 **Trend Discovery**: Automatically fetches trending topics from multiple sources
- 🤖 **AI Script Generation**: Uses OpenAI to create engaging video scripts
- 🎬 **Video Creation**: Generates visually appealing videos with animations
- 📤 **YouTube Upload**: Automatically uploads videos to your YouTube channel
- 🚀 **Full Pipeline**: Run the entire process with one click

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (copy `.env.example` to `.env`):
```bash
cp .env.example .env
```

3. Add your API keys:
   - **OpenAI API Key**: Get from https://platform.openai.com/api-keys
   - **YouTube API**: Set up OAuth 2.0 credentials in Google Cloud Console
     1. Create a project at https://console.cloud.google.com
     2. Enable YouTube Data API v3
     3. Create OAuth 2.0 credentials
     4. Add redirect URI: `http://localhost:3000/oauth2callback`
     5. Get refresh token using OAuth 2.0 Playground

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Production Deployment

The app is configured to deploy to Vercel:

```bash
vercel deploy --prod
```

## Usage

### Individual Steps

1. **Fetch Trends**: Click to discover the latest trending topics
2. **Generate Video**: Create a video about a trending topic
3. **Upload to YouTube**: Upload the generated video to your channel

### Automated Pipeline

Click "Run Complete Pipeline" to execute all steps automatically:
- Fetches trending topics
- Generates an AI script
- Creates a video
- Uploads to YouTube

## Technology Stack

- **Next.js 14**: React framework for the web interface
- **TypeScript**: Type-safe development
- **Canvas API**: Video frame generation
- **OpenAI API**: AI-powered script generation
- **Google YouTube API**: Automated video uploads
- **Vercel**: Deployment platform

## Notes

- Videos are generated in vertical format (1080x1920) optimized for YouTube Shorts
- The system uses faceless video format with text overlays and animations
- Default fallback content is provided if APIs are unavailable

## License

MIT
