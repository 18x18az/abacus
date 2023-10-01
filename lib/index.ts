import { MatchScore, SkillsScore } from '@18x18az/maestro-interfaces'

interface MatchResults {
  redScore: number
  blueScore: number
}

export function calculateAllianceScore (): number {
  return 1
}

export function calculateMatchScore (score: MatchScore): MatchResults {
  const redScore = calculateAllianceScore()
  const blueScore = calculateAllianceScore()

  return { redScore, blueScore }
}

export function calculateSkillsScore (score: SkillsScore): number {
  return 1
}
