'use client'

import { useState } from 'react'

export default function Home() {
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [trends, setTrends] = useState<string[]>([])
  const [videoUrl, setVideoUrl] = useState<string>('')

  const fetchTrends = async () => {
    setLoading(true)
    setStatus('Fetching latest trends...')
    try {
      const res = await fetch('/api/trends')
      const data = await res.json()
      if (data.trends) {
        setTrends(data.trends)
        setStatus('Trends fetched successfully!')
      }
    } catch (error) {
      setStatus('Error fetching trends: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const generateVideo = async () => {
    setLoading(true)
    setStatus('Generating video from trending topic...')
    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST'
      })
      const data = await res.json()
      if (data.success) {
        setVideoUrl(data.videoUrl || '')
        setStatus('Video generated successfully!')
      } else {
        setStatus('Error: ' + data.error)
      }
    } catch (error) {
      setStatus('Error generating video: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const uploadToYouTube = async () => {
    setLoading(true)
    setStatus('Uploading video to YouTube...')
    try {
      const res = await fetch('/api/upload-youtube', {
        method: 'POST'
      })
      const data = await res.json()
      if (data.success) {
        setStatus(`Video uploaded successfully! Video ID: ${data.videoId}`)
      } else {
        setStatus('Error: ' + data.error)
      }
    } catch (error) {
      setStatus('Error uploading to YouTube: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const runFullPipeline = async () => {
    setLoading(true)
    setStatus('Starting automated video pipeline...')
    try {
      const res = await fetch('/api/full-pipeline', {
        method: 'POST'
      })
      const data = await res.json()
      if (data.success) {
        setTrends(data.trends || [])
        setVideoUrl(data.videoUrl || '')
        setStatus(`Complete! Video uploaded: ${data.videoId}`)
      } else {
        setStatus('Error: ' + data.error)
      }
    } catch (error) {
      setStatus('Error running pipeline: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>🎥 Trend Video Agent</h1>
      <p className="subtitle">Automatically create and upload trending topic videos to YouTube</p>

      <div className="setup-section">
        <h3>⚙️ Setup Required</h3>
        <p style={{ marginBottom: '1rem', color: '#856404' }}>
          To use this agent, you need to configure API keys:
        </p>
        <ol>
          <li>Set <code>OPENAI_API_KEY</code> environment variable for AI-generated scripts</li>
          <li>Set <code>YOUTUBE_CLIENT_ID</code>, <code>YOUTUBE_CLIENT_SECRET</code>, and <code>YOUTUBE_REFRESH_TOKEN</code> for YouTube uploads</li>
          <li>Optionally set <code>NEWS_API_KEY</code> for news-based trends</li>
        </ol>
      </div>

      <div className="card">
        <h2>📊 Discover Trends</h2>
        <p>Fetch the latest trending topics from multiple sources</p>
        <button onClick={fetchTrends} disabled={loading}>
          {loading ? <><span className="loading"></span>Fetching...</> : 'Fetch Trends'}
        </button>
        {trends.length > 0 && (
          <ul className="trend-list">
            {trends.map((trend, i) => (
              <li key={i}>{trend}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h2>🎬 Generate Video</h2>
        <p>Create a short video about a trending topic with AI-generated script and visuals</p>
        <button onClick={generateVideo} disabled={loading}>
          {loading ? <><span className="loading"></span>Generating...</> : 'Generate Video'}
        </button>
        {videoUrl && (
          <div className="video-preview">
            <video controls src={videoUrl} />
          </div>
        )}
      </div>

      <div className="card">
        <h2>📤 Upload to YouTube</h2>
        <p>Upload the generated video to your YouTube channel</p>
        <button onClick={uploadToYouTube} disabled={loading}>
          {loading ? <><span className="loading"></span>Uploading...</> : 'Upload to YouTube'}
        </button>
      </div>

      <div className="card" style={{ borderLeft: '4px solid #764ba2' }}>
        <h2>🚀 Run Full Pipeline</h2>
        <p>Automatically fetch trends, generate video, and upload to YouTube</p>
        <button onClick={runFullPipeline} disabled={loading}>
          {loading ? <><span className="loading"></span>Processing...</> : 'Run Complete Pipeline'}
        </button>
      </div>

      {status && (
        <div className={`status ${status.includes('Error') ? 'error' : status.includes('success') || status.includes('Complete') ? 'success' : 'info'}`}>
          {status}
        </div>
      )}
    </div>
  )
}
