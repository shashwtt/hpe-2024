"use client";

import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { Howl, Howler } from "howler";

interface MuteContextType {
	isPaused: boolean;
	setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const SoundContext = createContext<MuteContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [sound, setSound] = useState<Howl | null>(null);

	useEffect(() => {
		var howl = new Howl({
			src: "/media/music.mp3",
			loop: true,
		});
		setSound(howl);
	}, []);

	useEffect(() => {
		if (sound) {
			if (isPaused) {
				sound.fade(1, 0, 400);
				setTimeout(() => {
					sound.pause();
				}, 400);
			} else {
                sound.play();
                sound.fade(0, 1, 1000);
			}
		}
	}, [isPaused]);

	return (
		<SoundContext.Provider
			value={{ isPaused: isPaused, setIsPaused: setIsPaused }}>
			{children}
		</SoundContext.Provider>
	);
};

export const useSound = (): MuteContextType => {
	const context = useContext(SoundContext);
	if (context === undefined) {
		throw new Error("useMute must be used within a MuteProvider");
	}
	return context;
};
