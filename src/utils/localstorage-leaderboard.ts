const LEADERBOARD_STORAGE_KEY = 'game-results'

export function appendToLeaderboard(level: number, points: number) {
    const thisGamesResults: GameStatsStorage = { level, points, timestamp: Date.now() }
    const gameResults = window.localStorage.getItem(LEADERBOARD_STORAGE_KEY)

    window.localStorage.setItem(
        'game-results', gameResults == null
            ? JSON.stringify([thisGamesResults])
            : JSON.stringify([ thisGamesResults, ...JSON.parse(gameResults)])
    )
}

export function getLeaderboard(): GameStatsStorage[] {
    const gameResults = window.localStorage.getItem(LEADERBOARD_STORAGE_KEY)

    if (gameResults == null)
        return []
    return JSON.parse(gameResults)
}