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
	const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		window.onmousemove = (e) => {
			const blobrect = blobRef.current?.getBoundingClientRect();

			const prevX = blobRef.current?.style.getPropertyValue("--blob-x");
			const prevY = blobRef.current?.style.getPropertyValue("--blob-y");

			const nextX = lerp(
				parseInt(prevX || "0"),
				e.pageX - (blobrect?.left || 0),
				0.05
			);
			const nextY = lerp(
				parseInt(prevY || "0"),
				e.pageY - (blobrect?.top || 0),
				0.05
			);

			blobRef.current?.style.setProperty("--blob-x", `${nextX}px`);
			blobRef.current?.style.setProperty("--blob-y", `${nextY}px`);
		};

		new SplitType(".textAnim", { types: ["chars", "words"] }).chars?.forEach((char) => {
			gsap.set(char, {
				display: "inline-block",
				color: "#404040",
				overflow: "visible",
			});
		});
		gsap.fromTo(
			".textAnim .char",
			{
				scaleX: 0.8,
				scaleY: 0.2,
				rotateY: -15,
				rotateX: -15,
				opacity: 0,
				x: 10,
				y: 20,
			},
			{
				scale: 1,
				stagger: 0.04,
				duration: .4,
				rotateX: 0,
				rotateY: 0,
				y: 0,
				x: 0,
				opacity:1,
				ease: "power2.out",
				onComplete: () => {
					gsap.set(".textAnim .char", {
						display: "inline",
						color: "transparent",
						overflow: "visible"
					});
				}
			}
		);
	}, []);

	useEffect(() => {
		
	});

	return (
		<ReactLenis
			root
			options={{
				lerp: 0.1,
			}}>
			<div className="bg-light dark:bg-black text-dark dark:text-light select-none relative font-satoshi w-screen min-h-screen">
				{/* <div className="w-full h-full fixed z-[3]">
					<div></div>
				</div> */}
				{/* FIXED ELEMENTS */}
				<div className="relative z-[5]">
					<Header />
					<DarkmodeSwitch />
				</div>
				<div
					className="w-screen min-h-screen flex items-center justify-center"
					ref={testRef}>
					<div
						ref={blobRef}
						className="textAnim text-[5rem] leading-none relative to-neutral-700 from-orange-400/90 bg-neutral-700 bg-clip-text font-magh max-w-6xl text-center bg-[radial-gradient(20rem_at_var(--blob-x)_var(--blob-y),_var(--tw-gradient-stops))] ">
							Introducing — DartXT. <br />  Ensuring access to affordable, reliable, sustainable and modern energy for all

					</div>
				</div>
			</div>
		</ReactLenis>
	);
}

// to-neutral-700 from-yellow-600
