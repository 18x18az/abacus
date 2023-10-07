import { AllianceScore, ELEVATION, ROBOT1_TIER } from '@18x18az/maestro-interfaces'

export const ZONE_POINTS = 2
export const GOAL_POINTS = 5

type BallScore = Omit<AllianceScore, 'robot1Tier' | 'robot2Tier'>

export function calculateBallScore (score: BallScore): number {
  let sum = 0

  sum += score.allianceTriballsInZone * ZONE_POINTS
  sum += score.allianceTriballsInGoal * GOAL_POINTS
  sum += score.zoneTriballs * ZONE_POINTS
  sum += score.goalTriballs * GOAL_POINTS

  return sum
}

export function isLower (robot: ELEVATION, other: ELEVATION): boolean {
  return robot < other
}
export function calculateNumLowerOrSame (elevation: ELEVATION, allElevatedRobots: ELEVATION[]): number {
  const count = 4 - allElevatedRobots.filter(robot => isLower(elevation, robot)).length

  return count
}

export function calculateSkillsElevation (tier: ROBOT1_TIER): number {
  switch (tier) {
    case ROBOT1_TIER.A:
      return 5
    case ROBOT1_TIER.B_D:
      return 10
    case ROBOT1_TIER.E_G:
      return 15
    case ROBOT1_TIER.H:
      return 20
  }

  return 0
}

export function calculateMatchElevation (elevation, allElevatedRobots): number {
  if (elevation === ELEVATION.NONE) {
    return 0
  }

  const numLowerOrSame = calculateNumLowerOrSame(elevation, allElevatedRobots)

  return numLowerOrSame * 5
}

export function calculateAllianceScore (score: AllianceScore, allElevatedRobots): number {
  let sum = 0

  sum += calculateBallScore(score)

  sum += calculateMatchElevation(score.robot1Tier, allElevatedRobots)
  sum += calculateMatchElevation(score.robot2Tier, allElevatedRobots)

  return sum
}
