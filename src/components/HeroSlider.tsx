import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/5.png";
import hero2 from "@/assets/3.png";
import hero3 from "@/assets/10.png";
import hero4 from "@/assets/3.png";

const slides = [
	{ id: 1, image: hero1, alt: "R.A Traders Store Interior" },
	{ id: 2, image: hero2, alt: "Premium Products Display" },
	{ id: 3, image: hero3, alt: "Modern Retail Experience" },
	{ id: 4, image: hero4, alt: "Modern Retail Experience" },
];

const SWIPE_THRESHOLD = 40; // px

const HeroSlider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const autoplayRef = useRef<number | null>(null);
	const touchStartX = useRef<number | null>(null);
	const touchDeltaX = useRef(0);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		const start = () => {
			clear();
			autoplayRef.current = window.setInterval(() => {
				setCurrentSlide((s) => (s + 1) % slides.length);
			}, 5000);
		};
		const clear = () => {
			if (autoplayRef.current) {
				window.clearInterval(autoplayRef.current);
				autoplayRef.current = null;
			}
		};
		if (!isPaused) start();
		return () => clear();
	}, [isPaused]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") prevSlide();
			if (e.key === "ArrowRight") nextSlide();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const nextSlide = () => setCurrentSlide((s) => (s + 1) % slides.length);
	const prevSlide = () => setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);

	// Touch handlers for mobile
	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
		touchDeltaX.current = 0;
		setIsPaused(true);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (touchStartX.current == null) return;
		touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
	};

	const handleTouchEnd = () => {
		const delta = touchDeltaX.current;
		touchStartX.current = null;
		touchDeltaX.current = 0;
		if (Math.abs(delta) > SWIPE_THRESHOLD) {
			if (delta > 0) prevSlide();
			else nextSlide();
		}
		// resume autoplay after short delay
		setTimeout(() => setIsPaused(false), 1500);
	};

	return (
		<section
			id="home"
			className="relative w-full h-[220px] sm:h-[320px] md:h-[520px] overflow-hidden mt-16 lg:mt-20"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			aria-roledescription="carousel"
		>
			{/* Slides */}
			{slides.map((slide, index) => (
				<div
					key={slide.id}
					role="group"
					aria-roledescription="slide"
					aria-label={`${index + 1} of ${slides.length}`}
					className={`absolute inset-0 transition-opacity duration-700 ${
						index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
					}`}
				>
					<img
						src={slide.image}
						alt={slide.alt}
						className="w-full h-full object-cover"
						loading="lazy"
						draggable={false}
						onDragStart={(e) => e.preventDefault()}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
				</div>
			))}

			{/* Prev / Next Buttons (compact on mobile) */}
			<Button
				variant="ghost"
				size="icon"
				onClick={prevSlide}
				className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/18 hover:bg-white/28 text-white p-1 sm:p-2 rounded-full"
				aria-label="Previous slide"
			>
				<ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={nextSlide}
				className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/18 hover:bg-white/28 text-white p-1 sm:p-2 rounded-full"
				aria-label="Next slide"
			>
				<ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
			</Button>

			{/* Indicators - larger targets on mobile */}
			<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrentSlide(i)}
						className={`rounded-full transition-all touch-manipulation ${
							i === currentSlide
								? "bg-white w-8 h-2 sm:w-10 sm:h-2"
								: "bg-white/50 w-3 h-3 sm:w-2 sm:h-2 hover:bg-white/70"
						}`}
						aria-label={`Go to slide ${i + 1}`}
					/>
				))}
			</div>
		</section>
	);
};

export default HeroSlider;
