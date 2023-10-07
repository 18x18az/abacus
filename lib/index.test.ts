import { AUTON_WINNER, AllianceScore, ELEVATION, MatchScore, ROBOT1_TIER, SkillsScore } from '@18x18az/maestro-interfaces'
import { calculateMatchScore, calculateSkillsScore } from './index'
import { calculateNumLowerOrSame, isLower } from './helpers'
describe('Match Score Calculation', () => {
  describe('Elevation Comparison', () => {
    it('should return false if the robot is at a higher elevation', () => {
      const robot = ELEVATION.C
      const other = ELEVATION.B
      const result = isLower(robot, other)
      expect(result).toBe(false)
    })

    it('should return false if the robot is at the same elevation', () => {
      const robot = ELEVATION.C
      const other = ELEVATION.C
      const result = isLower(robot, other)
      expect(result).toBe(false)
    })

    it('should return true if the robot is at a lower elevation', () => {
      const robot = ELEVATION.B
      const other = ELEVATION.C
      const result = isLower(robot, other)
      expect(result).toBe(true)
    })
  })

  describe('Elevation Counting', () => {
    it('should return 4 if the robot is the only one elevated', () => {
      const robot = ELEVATION.C
      const allRobots = [ELEVATION.C]
      const result = calculateNumLowerOrSame(robot, allRobots)
      expect(result).toBe(4)
    })

    it('should return 4 if all robots are tied', () => {
      const robot = ELEVATION.C
      const allRobots = [ELEVATION.C, ELEVATION.C, ELEVATION.C, ELEVATION.C]
      const result = calculateNumLowerOrSame(robot, allRobots)
      expect(result).toBe(4)
    })

    it('should return 1 if the robot is the lowest', () => {
      const robot = ELEVATION.C
      const allRobots = [ELEVATION.D, ELEVATION.D, ELEVATION.D, ELEVATION.B]
      const result = calculateNumLowerOrSame(robot, allRobots)
      expect(result).toBe(1)
    })
  })

  it('should return 0 if nothing is scored', () => {
    const redInput: AllianceScore = {
      goalTriballs: 0,
      zoneTriballs: 0,
      allianceTriballsInGoal: 0,
      allianceTriballsInZone: 0,
      robot1Tier: ELEVATION.NONE,
      robot2Tier: ELEVATION.NONE
    }
    const blueInput: AllianceScore = {
      goalTriballs: 0,
      zoneTriballs: 0,
      allianceTriballsInGoal: 0,
      allianceTriballsInZone: 0,
      robot1Tier: ELEVATION.NONE,
      robot2Tier: ELEVATION.NONE
    }

    const rawScore: MatchScore = {
      redScore: redInput,
      blueScore: blueInput,
      autonWinner: AUTON_WINNER.NONE
    }

    const scores = calculateMatchScore(rawScore)

    expect(scores.redScore).toBe(0)
    expect(scores.blueScore).toBe(0)
  })
})

describe('Skills Score Calculation', () => {
  it('should return 0 if nothing is scored', () => {
    const teamInput: SkillsScore = {
      goalTriballs: 0,
      zoneTriballs: 0,
      allianceTriballsInGoal: 0,
      allianceTriballsInZone: 0,
      robot1Tier: ROBOT1_TIER.NONE
    }
    const score = calculateSkillsScore(teamInput)
    expect(score).toBe(0)
  })
})
