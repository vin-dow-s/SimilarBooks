import Skeleton from '@/components/ui/Skeleton'

const LoadingSkeleton = () => {
    return (
        <div className="mt-8 mb-20 w-full max-w-6xl">
            <ul className="-mx-2 flex list-none flex-wrap">
                {Array.from({ length: 3 }, (_, index) => (
                    <li
                        key={index}
                        className="flex w-full flex-col items-center p-2 max-sm:mb-16 md:w-1/3"
                    >
                        <Skeleton className="mb-4 h-48 w-32" />
                        <Skeleton className="mt-2 mb-2 h-6 w-40 text-center" />
                        <Skeleton className="mb-6 h-3 w-12" />

                        <div className="flex flex-col items-start space-y-1">
                            <Skeleton className="h-3 w-80" />
                            <Skeleton className="h-3 w-72" />
                            <Skeleton className="h-3 w-64" />
                            <Skeleton className="h-3 w-80" />
                            <Skeleton className="h-3 w-72" />
                            <Skeleton className="h-3 w-72" />
                            <Skeleton className="h-3 w-48" />
                            <Skeleton className="h-3 w-64" />
                            <Skeleton className="h-3 w-64" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LoadingSkeleton
