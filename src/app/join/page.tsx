import Script from 'next/script'

export const metadata = {
    title: 'Get Early Access to Similar Books – Smart AI Book Recommendations',
    description:
        'Tell us what would make the perfect AI-powered book recommendation tool. Get early access, share your feedback, and help shape what we build next.',
}

const JoinPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
            <h1 className="mb-8 text-center text-4xl font-bold">
                📚 Help shape the perfect AI-powered book recommendation tool
            </h1>
            <div className="mb-16 flex flex-col gap-2 text-left">
                <p className="text-left text-lg text-gray-400">
                    🔍 Tell us what would make it truly game-changing
                </p>
                <p className="text-left text-lg text-gray-400">
                    🚀 Get exclusive early access & launch offer
                </p>
            </div>
            <iframe
                title="Join the Similar Books Waitlist"
                aria-label="Similar Books Waitlist Form"
                data-tally-src="https://tally.so/embed/mJovp4?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&theme=dark"
                loading="lazy"
                width="100%"
                height="300"
                className="w-full max-w-xl"
            ></iframe>
            <Script
                src="https://tally.so/widgets/embed.js"
                strategy="lazyOnload"
            />
        </div>
    )
}

export default JoinPage
