
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";

// EmailJS setup notes:
// 1. Sign up at https://www.emailjs.com/
// 2. Create a service and email template.
// 3. Get your USER_ID, SERVICE_ID, and TEMPLATE_ID from EmailJS dashboard.
// 4. Replace the placeholders below with your actual IDs.

const SERVICE_ID = "service_o3si7nr";
const TEMPLATE_ID = "template_578eqfp";
const USER_ID = "U4wFCTRJjVM0Mf4n5";

interface SocialLink {
	icon: React.ReactNode;
	url: string;
	label: string;
}
const socialLinks: SocialLink[] = [
	{ icon: <FaGithub />, url: "https://github.com/anujsc", label: "GitHub" },
	{ icon: <FaLinkedin />, url: "https://linkedin.com/in/anujsc", label: "LinkedIn" },
	{ icon: <FaInstagram />, url: "https://instagram.com/anujsc", label: "Instagram" },
];


interface FormData {
	name: string;
	email: string;
	message: string;
}
interface FormErrors {
	name?: string;
	email?: string;
	message?: string;
}

const Contact: React.FC = () => {
	const form = useRef<HTMLFormElement | null>(null);
	const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
	const [errors, setErrors] = useState<FormErrors>({});
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	// Basic validation
	const validate = (): boolean => {
		const errs: FormErrors = {};
		if (!formData.name.trim()) errs.name = "Full name required";
		if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = "Valid email required";
		if (!formData.message.trim()) errs.message = "Message required";
		setErrors(errs);
		return Object.keys(errs).length === 0;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: undefined });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validate()) return;
		setLoading(true);
		emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current as HTMLFormElement, USER_ID)
			.then(() => {
				setSuccess(true);
				setFormData({ name: "", email: "", message: "" });
				setLoading(false);
				setTimeout(() => setSuccess(false), 3000);
			})
			.catch(() => {
				setLoading(false);
				alert("Failed to send. Please try again.");
			});
	};

	return (
			<section
				id="contact"
				className="min-h-screen flex items-center justify-center bg-[#f7f7f7] font-[Inter] px-0 py-0 sm:px-2 sm:py-8"
			>
				<motion.div
					className="w-full max-w-2xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-gray-200 mx-0 sm:mx-4 my-0 sm:my-8"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: 'easeOut' }}
				>
		{/* Left: Contact Info */}
					<motion.div
						className="md:w-1/2 w-full p-5 sm:p-10 flex flex-col justify-between bg-[#fafafa] border-b border-gray-100 md:border-b-0 md:border-r"
						initial={{ x: -40, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
					>
						{/* Top bar for mobile */}
			{/* No top bar for simple look */}
					<div>
		     <h2 className="text-2xl sm:text-3xl font-bold text-[#222] mb-1 sm:mb-2 font-[Inter] text-center sm:text-left">Reach Me Out</h2>
		     <p className="text-xs sm:text-base text-gray-600 mb-4 sm:mb-8 font-[Fira Sans] text-center sm:text-left">Got a project? Let’s build something amazing!</p>
		     <div className="space-y-2 sm:space-y-4 text-gray-700 text-xs sm:text-base">
											<div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
												<FaEnvelope className="text-xl text-[#ba3f47]" />
												<span className="font-medium">anuj@example.com</span>
											</div>
											<div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
												<FaPhone className="text-xl text-[#ba3f47]" />
												<span className="font-medium">+91 8308791653</span>
											</div>
											<div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
												<FaMapMarkerAlt className="text-xl text-[#ba3f47]" />
												<span className="font-medium">jalgaon, India</span>
											</div>
							</div>
						</div>
				<div className="mt-6 sm:mt-10 flex gap-3 sm:gap-6 justify-center sm:justify-start">
							{socialLinks.map(({ icon, url, label }) => (
								<a
									key={label}
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									   className="text-[#ba3f47]/80 hover:text-[#ba3f47] text-xl sm:text-3xl transition-colors bg-white rounded-full p-2 sm:p-0 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#ba3f47]"
									aria-label={label}
								>
									{icon}
								</a>
							))}
						</div>
										<div className="mt-6 sm:mt-12 hidden md:block">
											{/* Placeholder for map or vector illustration */}
											<div className="w-full h-32 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-lg font-semibold border border-gray-200">
												<span className="">[Map / Illustration]</span>
											</div>
										</div>
		</motion.div>

		{/* Divider for mobile (removed for simple look) */}
						{/* Right: Contact Form */}
					<motion.form
						ref={form}
						onSubmit={handleSubmit}
	className="md:w-1/2 w-full p-4 sm:p-10 flex flex-col justify-center bg-white rounded-b-2xl md:rounded-b-none md:rounded-r-2xl border-t-0 md:border-l border-gray-200"
						initial={{ x: 40, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
					>
		  <div className="grid grid-cols-1 gap-3 sm:gap-6">
							<div>
			<label className="block mb-1 text-gray-700 font-semibold font-[Inter] text-xs sm:text-base">Full Name</label>
									<input
										type="text"
										name="name"
					  className={`w-full px-3 py-2 sm:px-5 sm:py-3 rounded-lg bg-gray-100 text-[#222] placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#ba3f47] font-[Fira Sans] text-xs sm:text-base transition-all duration-200 shadow-sm focus:shadow-md ${errors.name ? 'border-red-400' : ''}`}
										placeholder="Your Name"
										value={formData.name}
										onChange={handleChange}
										autoComplete="off"
									/>
					{errors.name && <span className="text-xs text-[#570100]/70 mt-1 block">{errors.name}</span>}
							</div>
							<div>
			<label className="block mb-1 text-gray-700 font-semibold font-[Inter] text-xs sm:text-base">Email Address</label>
									<input
										type="email"
										name="email"
					  className={`w-full px-3 py-2 sm:px-5 sm:py-3 rounded-lg bg-gray-100 text-[#222] placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#ba3f47] font-[Fira Sans] text-xs sm:text-base transition-all duration-200 shadow-sm focus:shadow-md ${errors.email ? 'border-red-400' : ''}`}
										placeholder="you@email.com"
										value={formData.email}
										onChange={handleChange}
										autoComplete="off"
									/>
					{errors.email && <span className="text-xs text-[#570100]/70 mt-1 block">{errors.email}</span>}
							</div>
							<div>
			<label className="block mb-1 text-gray-700 font-semibold font-[Inter] text-xs sm:text-base">Message</label>
									<textarea
										name="message"
										rows={4}
					  className={`w-full px-3 py-2 sm:px-5 sm:py-3 rounded-lg bg-gray-100 text-[#222] placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#ba3f47] font-[Fira Sans] text-xs sm:text-base transition-all duration-200 shadow-sm focus:shadow-md resize-none ${errors.message ? 'border-red-400' : ''}`}
										placeholder="Type your message..."
										value={formData.message}
										onChange={handleChange}
									/>
					{errors.message && <span className="text-xs text-[#570100]/70 mt-1 block">{errors.message}</span>}
							</div>
								<div className="flex justify-end mt-2">
									<motion.button
										type="submit"
										  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#ba3f47] text-white font-bold text-base sm:text-lg shadow-lg hover:scale-105 active:scale-95 transition-all outline-none font-[Inter] focus:ring-2 focus:ring-[#ba3f47] mt-2 sm:mt-0"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.97 }}
										disabled={loading}
									>
										{loading ? "Sending..." : "Send Message"}
									</motion.button>
								</div>
						</div>
						{/* Success Toast */}
						<AnimatePresence>
							{success && (
								<motion.div
									className="fixed left-1/2 top-8 z-50 -translate-x-1/2 bg-[#ba3f47] text-white px-6 py-3 rounded-2xl shadow-lg font-semibold text-sm sm:text-base font-[Inter]"
									initial={{ opacity: 0, y: -30 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -30 }}
									transition={{ duration: 0.5 }}
								>
									Message sent successfully! 🚀
								</motion.div>
							)}
						</AnimatePresence>
					{/* Placeholder for map/illustration on mobile */}
								<div className="mt-4 sm:mt-8 md:hidden">
									<div className="w-full h-20 sm:h-32 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-xs sm:text-lg font-semibold border border-gray-200">
										<span>[Map / Illustration]</span>
									</div>
								</div>
					</motion.form>
					</motion.div>
				</section>
	);
};

export default Contact;
