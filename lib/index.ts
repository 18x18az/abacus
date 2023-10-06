import { AllianceScore, MatchScore, SkillsScore, ELEVATION } from '@18x18az/maestro-interfaces'

interface MatchResults {
  redScore: number
  blueScore: number
}
function compareElevation (elevation, allElevatedRobots): number {
  let count: number = 0

  for (let i: number = 0; i < allElevatedRobots.length; i++) {
    if (elevation.charCodeAt(0) < allElevatedRobots[i].charCodeAt(0)) {
      count += 1
    } else {
      count += 0
    }
  }

  return count
}

function calculateSkillsElevation (score: SkillsScore, tiers): number {
  let finalScore: number = 0

  for (let i: number = 0; i < tiers.length; i++) {
    if (score.robot1Tier === tiers[i]) {
      finalScore = i
    }
  }

  return finalScore * 5
}

function calculateMatchElevation (elevation, allElevatedRobots): number {
  if (elevation === ELEVATION.NONE) {
    return 0
  }

  const numRobotsElevated = compareElevation(elevation, allElevatedRobots)

  return (4 - numRobotsElevated) * 5
}

export function calculateAllianceScore (score: AllianceScore, elevationRobot1, elevationRobot2, allElevatedRobots): number {
  let sum: number = 0
  const ZONE_POINTS: number = 2
  const GOAL_POINTS: number = 5
  const alliance = score.allianceTriballsInZone * ZONE_POINTS
  const allianceGoal = score.allianceTriballsInGoal * GOAL_POINTS
  const normalTriball = score.zoneTriballs * ZONE_POINTS
  const normalTriballGoal = score.goalTriballs * GOAL_POINTS
  const oneRobotElevation = calculateMatchElevation(elevationRobot1, allElevatedRobots)
  const twoRobotElevation = calculateMatchElevation(elevationRobot2, allElevatedRobots)

  // let finalElevationScore:number = this.

  sum = alliance + allianceGoal + normalTriball + normalTriballGoal + oneRobotElevation + twoRobotElevation

  return sum
}
export function calculateMatchScore (score: MatchScore, allElevatedRobots): MatchResults {
  let redScore = calculateAllianceScore(score.redScore, score.redScore.robot1Tier, score.redScore.robot2Tier, allElevatedRobots)
  let blueScore = calculateAllianceScore(score.blueScore, score.blueScore.robot1Tier, score.blueScore.robot2Tier, allElevatedRobots)
  const autoWin: number = 8
  const autoTie: number = 4

  if (score.autonWinner === 'red') {
    redScore = redScore + autoWin
  } else if (score.autonWinner === 'blue') {
    blueScore = blueScore + autoWin
  } else if (score.autonWinner === 'tie') {
    blueScore = blueScore + autoTie
    redScore = redScore + autoTie
  }

  return { redScore, blueScore }
}

export function calculateSkillsScore (score: SkillsScore, tiers): number {
  let sum: number = 0
  const ZONE_POINTS: number = 2
  const GOAL_POINTS: number = 5

  const alliance = score.allianceTriballsInZone * ZONE_POINTS
  const allianceGoal = score.allianceTriballsInGoal * GOAL_POINTS
  const normalTriball = score.zoneTriballs * ZONE_POINTS
  const normalTriballGoal = score.goalTriballs * GOAL_POINTS
  const elevation = calculateSkillsElevation(score, tiers)

  sum = alliance + allianceGoal + normalTriball + normalTriballGoal + elevation

  return sum
}
