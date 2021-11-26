import React from 'react'

function AskQuestion() {
    return (
        <div>
            <div className="mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h2 className="block text-3xl font-extrabold tracking-tight text-gray-900 sm:block sm:text-4xl">
                    Ask Me Anything
                </h2>
                <p className="block text-3xl font-extrabold tracking-tight text-blue-600 sm:block sm:text-4xl">
                    The Web3 Native Way.
                </p>
                <form className="mt-8 sm:flex">
                    <label htmlFor="question" className="sr-only">
                        Question
                    </label>
                    <input
                        id="question"
                        name="question"
                        type="text"
                        required
                        className="w-full sm:max-w-xl px-5 py-3 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        placeholder="What is your favorite Programming Language?"
                    />
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AskQuestion
