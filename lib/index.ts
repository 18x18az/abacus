import { AllianceScore, MatchScore, SkillsScore, ELEVATION } from '@18x18az/maestro-interfaces'

interface MatchResults {
  redScore: number
  blueScore: number
}
function compareElevation (elevation, allElevatedRobots): number {
  let count: number = 0

  for (let i: number = 0; i < allElevatedRobots.length; i++) {
    if (elevation.valueOf().charCodeAt(0) < allElevatedRobots.valueOf().charCodeAt(0)) {
      count += 1
    } else {
      count += 0
    }
  }

  return count
}

function calculateSkillsElevation (score: SkillsScore): number {
  let finalScore: number = 0
  if (score.robot1Tier === 'a') {
    finalScore = 5
  } else if (score.robot1Tier === 'b_d') {
    finalScore = 10
  } else if (score.robot1Tier === 'e_g') {
    finalScore = 15
  } else {
    finalScore = 20
  }
  return finalScore
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
  const alliance = score.allianceTriballsInZone.valueOf() * ZONE_POINTS
  const allianceGoal = score.allianceTriballsInGoal.valueOf() * GOAL_POINTS
  const normalTriball = score.zoneTriballs.valueOf() * ZONE_POINTS
  const normalTriballGoal = score.goalTriballs.valueOf() * GOAL_POINTS
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

export function calculateSkillsScore (score: SkillsScore): number {
  let sum: number = 0
  const ZONE_POINTS: number = 2
  const GOAL_POINTS: number = 5

  const alliance = score.allianceTriballsInZone.valueOf() * ZONE_POINTS
  const allianceGoal = score.allianceTriballsInGoal.valueOf() * GOAL_POINTS
  const normalTriball = score.zoneTriballs.valueOf() * ZONE_POINTS
  const normalTriballGoal = score.goalTriballs.valueOf() * GOAL_POINTS
  const elevation = calculateSkillsElevation(score)

  sum = alliance + allianceGoal + normalTriball + normalTriballGoal + elevation

  return sum
}
