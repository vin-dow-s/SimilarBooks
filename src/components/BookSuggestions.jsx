import Image from "next/image"
import PropTypes from "prop-types"

const BookSuggestions = ({ suggestions, onSelect }) => {
    return (
        <ul className="absolute w-full left-0 top-14 z-10 border border-gray-300 bg-white rounded-md shadow-lg">
            {suggestions.map((suggestion) => (
                <li
                    key={suggestion.etag}
                    className="flex h-16 [&:not(:last-child)]:border-b-2 justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                    onMouseDown={() => onSelect(suggestion)}
                >
                    <div className="flex-1 truncate">
                        <span
                            className="block truncate"
                            style={{ maxWidth: "90%" }}
                        >
                            {suggestion.volumeInfo.title}
                        </span>
                    </div>
                    {suggestion.volumeInfo.imageLinks?.thumbnail && (
                        <Image
                            src={suggestion.volumeInfo.imageLinks.thumbnail.replace(
                                "http:",
                                "https:"
                            )}
                            alt={`Cover of the book ${suggestion.volumeInfo.title}`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                                width: "32px",
                                height: "auto",
                            }}
                            className="rounded"
                        />
                    )}
                </li>
            ))}
        </ul>
    )
}

BookSuggestions.propTypes = {
    suggestions: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default BookSuggestions
