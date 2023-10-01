import { AUTON_WINNER, AllianceScore, ELEVATION, MatchScore } from '@18x18az/maestro-interfaces'
import { calculateMatchScore } from './index'

describe('calculateMatchScore', () => {
  it('should return 1 for both right now', () => {
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

    expect(scores.redScore).toBe(1)
    expect(scores.blueScore).toBe(1)
  })
})

describe('calculateSkillsScore', () => {

})
