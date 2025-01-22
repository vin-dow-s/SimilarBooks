import { Skeleton } from "@nextui-org/react"

const LoadingSkeleton = () => {
    return (
        <div className="mt-8 mb-20 w-full max-w-6xl">
            <ul className="list-none flex flex-wrap -mx-2">
                {Array.from({ length: 3 }, (_, index) => (
                    <li
                        key={index}
                        className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 max-sm:mb-16 p-2 flex flex-col items-center"
                    >
                        <Skeleton className="w-32 h-48 rounded mb-4 bg-gray-600 animate-pulse" />
                        <Skeleton className="w-40 text-center h-6 rounded mt-2 mb-2 bg-gray-600 animate-pulse" />
                        <Skeleton className="w-12 h-3 rounded mb-6 bg-gray-600 animate-pulse" />
                        <div
                            className="flex flex-col items-start"
                            style={{ marginBottom: "4px" }}
                        >
                            <Skeleton className="w-80 h-3 rounded mb-1 bg-gray-600 animate-pulse" />
                            <Skeleton className="w-72 h-3 rounded mb-1 bg-gray-600 animate-pulse" />
                            <Skeleton className="w-64 h-3 rounded mb-1 bg-gray-600 animate-pulse" />
                            <Skeleton className="w-80 h-3 rounded mb-1 bg-gray-600 animate-pulse" />
                            <Skeleton className="w-72 h-3 rounded mb-1 bg-gray-600 animate-pulse" />
                            <Skeleton className="w-72 h-3 rounded mb-1 bg-gray-600 animate-pulse" />
                            <Skeleton className="w-48 h-3 rounded mb-1 bg-gray-600 animate-pulse" />
                            <Skeleton className="w-64 h-3 rounded mb-1 bg-gray-600 animate-pulse" />
                            <Skeleton className="w-64 h-3 rounded mb-1 bg-gray-600 animate-pulse" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LoadingSkeleton
