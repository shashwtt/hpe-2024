import { useSound } from "@/helpers/context/SoundContext";
import classNames from "classnames";
import { useContext, useEffect, useRef, useState } from "react";

export default function Header() {
	const { isPaused, setIsPaused } = useSound();

	return (
		<div className="fixed w-screen h-16">
			<div className="w-full px-6 h-full mx-auto text-orange-300/80">
				<div className="flex mx-auto w-full px-4 border-b border-black/10 dark:border-orange-200/20  items-center justify-between h-full">
					<div className="flex items-center">
						<a href="/" className="text-xl scale-110">
							Hackathon.
						</a>
					</div>
					<div className="flex gap-8 items-center pt-1">
						<a href="#" className="text-xl ">
							Contribute
						</a>
						<div
							onClick={() => {
								setIsPaused(!isPaused);
							}}
							className="rounded-full cursor-pointer hover:outline outline-1 outline-dark/10 dark:outline-light/10 outline-offset-2 w-20 border h-9 border-black/30 dark:border-light/40">
							<MuteBtn />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const MuteBtn = () => {
	const { isPaused } = useSound();
	const wavyPath = useRef<SVGPathElement>(null);
	const speed = useRef(0.6);
	useEffect(() => {
		let t = 0;
		let xs: number[] = Array.from({ length: 200 }, (_, i) => i);

		function animatewavy() {
			let points = xs.map((x) => {
				let y = 10 + (speed.current == 0 ? 4 : 4) * Math.sin((x + t) / 5);
				return [x, y];
			});

			let path =
				"M" +
				points
					.map((p) => {
						return p[0] + "," + p[1];
					})
					.join(" L");

			wavyPath.current?.setAttribute("d", path);
			requestAnimationFrame(animatewavy);
			t += speed.current;
		}

		animatewavy();
	}, []);

	useEffect(() => {
		speed.current = isPaused ? 0 : 0.4;
	}, [isPaused]);

	return (
		<div className="w-full flex items-center px-1.5 h-full">
			<svg
				className={classNames("h-5 w-full duration-500 ease-in", {
					"scale-y-[.75] opacity-80": isPaused,
				})}>
				<path
					ref={wavyPath}
					className={classNames(
						"stroke-[1.5] stroke-dark/80 transition-[stroke] duration-500 dark:stroke-light fill-none",
						{
							"stroke-dark/80 dark:stroke-light": !isPaused,
							"stroke-dark/30 dark:stroke-light/500": isPaused,
						}
					)}
				/>
			</svg>
		</div>
	);
};
