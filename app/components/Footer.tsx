export default function Footer() {
	return (
		<footer className="py-8 text-center border-t border-white/5">
			<p className="text-[11px] tracking-widest uppercase text-slate-600">
				© {new Date().getFullYear()} — Handcrafted with care
			</p>
		</footer>
	);
}
