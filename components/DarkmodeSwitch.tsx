export default function DarkmodeSwitch() {
    const setTWdark = () => {
        document.documentElement.classList.add("class");
    }
	return (
		<div onClick={setTWdark} className="w-10 aspect-square border bg-black/10 border-dark/60 cursor-pointer fixed bottom-6 rounded-xl left-8"></div>
	);
}
