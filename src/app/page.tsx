import SearchInterface from '@/components/SearchInterface'

const Home = () => {
    return (
        <main className="flex min-h-dvh flex-col items-center justify-between">
            <SearchInterface />
            <div className="flex flex-col items-center justify-center gap-8">
                <p className="text-center text-sm text-gray-400">
                    Help shape the next version -{' '}
                    <a href="/join" className="text-indigo-400 underline">
                        Get early access & launch offer →
                    </a>
                </p>
                <footer className="my-2 text-sm text-gray-400">
                    © 2025- by{' '}
                    <a href="mailto:vincent@vindows.dev" className="italic">
                        Vindows
                    </a>
                    .
                </footer>
            </div>
        </main>
    )
}

export default Home
