import { Dispatch, SetStateAction, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'

interface GameTimerProps {
	timer: number
	setTimer: Dispatch<SetStateAction<number>>
	isRunningTimer: boolean
}

export default function GameTimer({
	timer,
	setTimer,
	isRunningTimer,
}: GameTimerProps) {
	const updateTimer = useAuthStore(state => state.updateTimer)

	useEffect(() => {
		let time: number | null = null
		if (isRunningTimer) {
			time = setInterval(() => {
				setTimer(prevTime => {
					const newTime = prevTime + 1
					updateTimer(newTime)
					return newTime
				})
			}, 1000)
		}

		return () => {
			if (time) clearInterval(time)
		}
	}, [isRunningTimer])

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
			2,
			'0'
		)}`
	}

	return formatTime(timer)
}
