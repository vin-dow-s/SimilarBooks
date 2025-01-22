import Image from "next/image"
import PropTypes from "prop-types"

const SimilarBooks = ({ books }) => {
    return (
        <div className="mt-8 mb-20 w-full max-w-6xl">
            <ul className="list-none flex flex-wrap -mx-2">
                {books.map((book) => (
                    <li
                        key={book.id}
                        className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 max-sm:mb-16 p-2 flex flex-col items-center"
                    >
                        <a
                            href={book.volumeInfo?.infoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="relative w-32 h-48 rounded cursor-pointer">
                                {book.volumeInfo?.imageLinks?.thumbnail ? (
                                    <Image
                                        src={book.volumeInfo?.imageLinks?.thumbnail?.replace(
                                            "http:",
                                            "https:"
                                        )}
                                        alt={`Cover of the book ${book.volumeInfo?.title}`}
                                        sizes="100vw"
                                        width={0}
                                        height={0}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        className="rounded opacity-100 hover:opacity-50 transition-opacity duration-200 ease-in-out"
                                    />
                                ) : (
                                    <div className="bg-gray-300 rounded w-32 h-48 flex items-center justify-center">
                                        No image
                                    </div>
                                )}
                            </div>
                        </a>
                        <div className="content-center text-center">
                            <h3 className="text-xl font-semibold mt-4">
                                {book.volumeInfo.title &&
                                book.volumeInfo.title?.length > 30
                                    ? book.volumeInfo.title?.substring(0, 30) +
                                      "..."
                                    : book.volumeInfo?.title}
                            </h3>
                            <p className="text-gray-300 text-sm">
                                {book.volumeInfo?.authors?.[0] ||
                                    "Unknown author"}
                            </p>
                            <p className="text-gray-400 text-sm pt-4 text-left">
                                {book.volumeInfo.description?.substring(
                                    0,
                                    400
                                ) ?? "No description available."}
                                ... ...
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

SimilarBooks.propTypes = {
    books: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            volumeInfo: PropTypes.shape({
                infoLink: PropTypes.string,
                imageLinks: PropTypes.shape({
                    thumbnail: PropTypes.string,
                }),
                title: PropTypes.string,
                authors: PropTypes.arrayOf(PropTypes.string),
                description: PropTypes.string,
            }),
        })
    ).isRequired,
}

export default SimilarBooks
