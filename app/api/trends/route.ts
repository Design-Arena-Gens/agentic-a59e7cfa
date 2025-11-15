import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const trends: string[] = []

    // Try Google Trends alternative - fetch from trending GitHub repos
    try {
      const githubRes = await fetch('https://api.github.com/search/repositories?q=created:>2025-01-01&sort=stars&order=desc&per_page=5', {
        headers: {
          'User-Agent': 'TrendVideoAgent'
        }
      })
      const githubData = await githubRes.json()
      if (githubData.items) {
        githubData.items.forEach((item: any) => {
          trends.push(`${item.name} - ${item.description?.substring(0, 50) || 'Tech project'}`)
        })
      }
    } catch (error) {
      console.error('GitHub trends error:', error)
    }

    // Fallback trending topics if APIs fail
    if (trends.length === 0) {
      trends.push(
        'AI and Machine Learning breakthroughs in 2025',
        'Climate change solutions and green technology',
        'Space exploration and Mars missions',
        'Cryptocurrency and blockchain innovations',
        'Remote work revolution and digital nomads'
      )
    }

    return NextResponse.json({ trends: trends.slice(0, 5) })
  } catch (error) {
    console.error('Error fetching trends:', error)
    return NextResponse.json({
      error: 'Failed to fetch trends',
      trends: ['Default trending topic: Technology in 2025']
    }, { status: 500 })
  }
}
