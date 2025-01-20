import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface ScreenContextType {
	screen: 'home' | 'difficulty' | 'game'
	setScreen: Dispatch<SetStateAction<'home' | 'difficulty' | 'game'>>
}

const ScreenContext = createContext<ScreenContextType | undefined>(undefined)

export const ScreenProvider = ({ children }: { children: React.ReactNode }) => {
	const [screen, setScreen] = useState<'home' | 'difficulty' | 'game'>('home')

	return (
		<ScreenContext.Provider
			value={{
				screen,
				setScreen,
			}}
		>
			{children}
		</ScreenContext.Provider>
	)
}

export const useScreen = () => {
	const context = useContext(ScreenContext)
	if (!context) {
		throw new Error('useScreen должен использоваться внутри ScreenProvider')
	}
	return context
}
