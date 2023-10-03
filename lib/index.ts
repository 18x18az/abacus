import { AllianceScore, MatchScore, SkillsScore } from '@18x18az/maestro-interfaces'

interface MatchResults {
  redScore: number
  blueScore: number
}

export function calculateAllianceScore (score: AllianceScore): number {
  let sum: number = 0
  const alliance = this.allianceTriballsInZone * 2
  const allianceGoal = this.allianceTriballsInGoal * 5
  const normalTriball = this.zoneTriballs * 2
  const normalTriballGoal = this.goalTriballs * 5

  // let finalElevationScore:number = this.

  sum = alliance + allianceGoal + normalTriball + normalTriballGoal

  return sum
}

export function calculateMatchScore (score: MatchScore): MatchResults {
  let redScore = calculateAllianceScore(score.redScore)
  let blueScore = calculateAllianceScore(score.blueScore)

  if (score.autonWinner === 'red') {
    redScore = redScore + 8
  } else if (score.autonWinner === 'blue') {
    blueScore = blueScore + 8
  } else if (score.autonWinner === 'tie') {
    blueScore = blueScore + 4
    redScore = redScore + 4
  }

  return { redScore, blueScore }
}

export function calculateSkillsScore (score: SkillsScore): number {
  return 1
}
