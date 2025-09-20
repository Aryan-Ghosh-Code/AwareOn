const Contact = () => {
	return (
		<div id="contact" className="mt-10 w-full items-center justify-center p-4 pb-12">
			<div className="w-full flex flex-col gap-1 items-center justify-center">
				<h1 className="text-[39px] lg:text-[50px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-300 z-10">Contact</h1>
				<p className="lg:text-lg italic text-gray-200 text-center">Get in touch with us and resolve all your queries!</p>
			</div>

			<div className="mt-8 flex flex-col w-full items-center justify-center">
				<div className="flex flex-col justify-center items-center p-4 bg-white/5 backdrop-blur-lg shadow-md border border-white/30 rounded-lg">
					<h1 className="text-xl font-semibold mb-[3px] text-gray-300">Send us an Email</h1>
					<div className="h-[3.3px] bg-blue-300 w-10 rounded-lg mb-4" />
					<div className="flex items-start flex-col gap-3 w-[260px] md:w-[300px] lg:w-[450px]">
						<div className="flex flex-col gap-1 w-full">
							<label className="text-base font-medium text-gray-300">Email</label>
							<input
								type="text"
								placeholder="Enter your email"
								className="input-primary"
							/>
						</div>

						<div className="flex flex-col gap-1 w-full">
							<label className="text-base font-medium text-gray-300">Message</label>
							<textarea
								placeholder="Enter your message"
								className="h-[180px] resize-none input-primary"
							/>
						</div>
					</div>

					<button className="btn-submit mt-4">Submit</button>
				</div>
			</div>
		</div>
	)
}

export default Contact;