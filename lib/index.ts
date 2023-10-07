import { MatchScore, SkillsScore, ELEVATION, AUTON_WINNER } from '@18x18az/maestro-interfaces'
import { calculateAllianceScore, calculateBallScore, calculateSkillsElevation } from './helpers'

const AUTO_WIN = 8
interface MatchResults {
  redScore: number
  blueScore: number
}
export function calculateMatchScore (score: MatchScore): MatchResults {
  const allElevatedRobots = [score.redScore.robot1Tier, score.redScore.robot2Tier, score.blueScore.robot1Tier, score.blueScore.robot2Tier].filter(elevation => elevation !== ELEVATION.NONE)

  let redScore = calculateAllianceScore(score.redScore, allElevatedRobots)
  let blueScore = calculateAllianceScore(score.blueScore, allElevatedRobots)

  if (score.autonWinner === AUTON_WINNER.RED) {
    redScore += AUTO_WIN
  } else if (score.autonWinner === AUTON_WINNER.BLUE) {
    blueScore += AUTO_WIN
  } else if (score.autonWinner === AUTON_WINNER.TIE) {
    blueScore += AUTO_WIN / 2
    redScore += AUTO_WIN / 2
  }

  return { redScore, blueScore }
}

export function calculateSkillsScore (score: SkillsScore): number {
  let sum = 0

  sum += calculateBallScore(score)
  sum += calculateSkillsElevation(score.robot1Tier)

  return sum
}
