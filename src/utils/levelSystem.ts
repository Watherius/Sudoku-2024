interface LevelThreshold {
	level: number
	requiredExperience: number
}

const levelThresholds: LevelThreshold[] = [
	{ level: 1, requiredExperience: 100 },
	{ level: 2, requiredExperience: 200 },
	{ level: 3, requiredExperience: 300 },
	{ level: 4, requiredExperience: 500 },
	{ level: 5, requiredExperience: 800 },
	{ level: 6, requiredExperience: 1000 },
	{ level: 7, requiredExperience: 1200 },
	{ level: 8, requiredExperience: 1500 },
	{ level: 9, requiredExperience: 2000 },
	{ level: 10, requiredExperience: 2500 },
]

export const getNextLevelThreshold = (currentLevel: number): number => {
	const nextLevel = levelThresholds.find(lt => lt.level === currentLevel + 1)
	return nextLevel?.requiredExperience || Infinity
}

export const calculateNewLevel = (currentExperience: number): number => {
	let level = 1
	for (const threshold of levelThresholds) {
		if (currentExperience >= threshold.requiredExperience) {
			level = threshold.level + 1
		} else {
			break
		}
	}
	return level
}
