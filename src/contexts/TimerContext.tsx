import { createContext, useContext, useEffect, useState } from 'react'

interface TimerContextType {
	timer: string
	startTimer: (initialTime?: string) => void
	stopTimer: () => void
	resetTimer: () => void
}

const TimerContext = createContext<TimerContextType | undefined>(undefined)

export function TimerProvider({ children }: { children: React.ReactNode }) {
	const [seconds, setSeconds] = useState(0)
	const [isRunning, setIsRunning] = useState(false)

	const formatTime = (totalSeconds: number): string => {
		const minutes = Math.floor(totalSeconds / 60)
		const remainingSeconds = totalSeconds % 60
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
	}

	const startTimer = (initialTime?: string) => {
		if (initialTime) {
			const [minutes, seconds] = initialTime.split(':').map(Number)
			setSeconds(minutes * 60 + seconds)
		}
		setIsRunning(true)
	}

	const stopTimer = () => {
		setIsRunning(false)
	}

	const resetTimer = () => {
		setSeconds(0)
		setIsRunning(false)
	}

	useEffect(() => {
		let interval: NodeJS.Timeout | undefined

		if (isRunning) {
			interval = setInterval(() => {
				setSeconds(prev => {
					const newValue = prev + 1
					localStorage.setItem('gameTimer', formatTime(newValue))
					return newValue
				})
			}, 1000)
		}

		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [isRunning])

	return (
		<TimerContext.Provider
			value={{
				timer: formatTime(seconds),
				startTimer,
				stopTimer,
				resetTimer,
			}}
		>
			{children}
		</TimerContext.Provider>
	)
}

export function useTimer() {
	const context = useContext(TimerContext)
	if (!context) {
		throw new Error('useTimer должен использоваться внутри TimerProvider')
	}
	return context
}
