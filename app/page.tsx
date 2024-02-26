"use client";

import { useEffect, useState, useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import Header from "@/components/Header";
import DarkmodeSwitch from "@/components/DarkmodeSwitch";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import SplitType from "split-type";
import { Bounce } from "gsap";

export default function Page() {
	const blobRef = useRef<HTMLDivElement>(null);
	const testRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		window.onmousemove = (e) => {
			const blobrect = blobRef.current?.getBoundingClientRect();

			const prevX = blobRef.current?.style.getPropertyValue("--blob-x");
			const prevY = blobRef.current?.style.getPropertyValue("--blob-y");

			const nextX = lerp(parseInt(prevX || "0"), e.clientX, 0.08);
			const nextY = lerp(parseInt(prevY || "0"), e.clientY, 0.08);

			blobRef.current?.style.setProperty("--blob-x", `${nextX}px`);
			blobRef.current?.style.setProperty("--blob-y", `${nextY}px`);
		};

		if (videoRef.current) {
			// videoRef.current.playbackRate = 0;
		}

		new SplitType(".textAnim", { types: ["chars", "words"] }).chars?.forEach(
			(char) => {
				gsap.set(char, {
					display: "inline-block",
					color: "#CB984B",
					overflow: "visible",
					padding: "0 0.001em",
				});
			}
		);
		gsap.fromTo(
			".textAnim .char",
			{
				scaleX: 0.8,
				scaleY: 0.6,
				rotateY: -15,
				rotateX: -15,
				opacity: 0,
				x: 10,
				y: 20,
			},
			{
				scale: 1,
				stagger: {
					amount: 2,
				},
				duration: 0.6,
				rotateX: 0,
				rotateY: 0,
				y: 0,
				x: 0,
				opacity: 1,
				ease: "power2.out",
				onComplete: () => {
					gsap.set(".textAnim .char", {
						display: "inline",
						color: "transparent",
						overflow: "visible",
					});
				},
			}
		);
	}, []);

	useEffect(() => {});

	return (
		<ReactLenis
			root
			options={{
				lerp: 0.1,
			}}>
			<div className="bg-light dark:bg-black text-dark dark:text-light select-none relative font-satoshi w-screen min-h-screen">
				<div className="w-screen h-screen fixed flex p-1 items-center justify-center">
					{/* <div className="w-full h-full rounded-xl border overflow-hidden border-light bg-cover bg-[url(https://media.discordapp.net/attachments/1005134417620127776/1211652135100612638/image.png?ex=65eef9fc&is=65dc84fc&hm=a9c99a29edca184146947686dc2bbf05b558e464b9d0937a459b35d737970033&=&format=webp&quality=lossless&width=396&height=198)] z-30 opacity-100"></div> */}
					<div className="w-full h-full rounded-xl border overflow-hidden border-light z-30 opacity-10">
						<video
							autoPlay
							loop
							muted
							ref={videoRef}
							className="w-full h-full object-cover">
							<source src="/media/hero.mp4" type="video/mp4" />
						</video>
					</div>
				</div>
				{/* <div className="w-full h-full fixed z-[3]">
					<div></div>
				</div> */}
				{/* FIXED ELEMENTS */}
				<div className="relative z-[5]">
					<Header />
					{/* <DarkmodeSwitch /> */}
				</div>
				<div
					className="w-screen min-h-screen flex items-end pb-10 pl-10"
					ref={testRef}>
					<div
						ref={blobRef}
						className="textAnim text-[5.1rem] leading-[1.1] relative bg-orange-400 bg-clip-text bg-fixed font-magh max-w-6xl to-black from-black dark:to-yellow-200 opacity-80 dark:from-orange-500 bg-gradient-to-tl bag-[radial-gradient(30rem_at_var(--blob-x)_var(--blob-y),_var(--tw-gradient-stops))] ">
						Introducing — DartXT. <br /> Ensuring access to affordable,
						reliable, sustainable and modern energy for all
					</div>
				</div>
			</div>
		</ReactLenis>
	);
}

// to-neutral-700 from-yellow-600
