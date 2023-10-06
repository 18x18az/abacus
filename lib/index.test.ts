import { AUTON_WINNER, AllianceScore, ELEVATION, MatchScore, ROBOT1_TIER, SkillsScore } from '@18x18az/maestro-interfaces'
import { calculateMatchScore, calculateSkillsScore } from './index'

describe('calculateMatchScore', () => {
  it('should return proper score now', () => {
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

    const allElevatedRobots = [redInput.robot1Tier, redInput.robot2Tier, blueInput.robot1Tier, blueInput.robot2Tier].filter(elevation => elevation !== ELEVATION.NONE)
    const scores = calculateMatchScore(rawScore, allElevatedRobots)

    expect(scores.redScore).toBe(0)
    expect(scores.blueScore).toBe(0)
  })
})

describe('calculateSkillsScore', () => {
  it('should return proper score now', () => {
    const teamInput: SkillsScore = {
      goalTriballs: 0,
      zoneTriballs: 0,
      allianceTriballsInGoal: 0,
      allianceTriballsInZone: 0,
      robot1Tier: ROBOT1_TIER.NONE
    }
    const tiers = Object.values(ROBOT1_TIER)
    console.log(tiers)
    const score = calculateSkillsScore(teamInput, tiers)
    expect(score).toBe(0)
  })
})
