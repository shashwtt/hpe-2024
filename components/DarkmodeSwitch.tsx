export default function DarkmodeSwitch() {
    const setTWdark = () => {
        document.documentElement.classList.add("class");
    }
	return (
		<div onClick={setTWdark} className="w-auto px-4 py-1 border bg-light/5 border-dark/60 cursor-pointer fixed bottom-6 rounded-xl left-8">
            scroll further down &nbsp;↓
        </div>
	);
}
