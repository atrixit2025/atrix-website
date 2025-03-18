import React from 'react'

const Test = () => {
    return (
        <div className=''>
            <div className='container mx-auto '>
                <div className='row grid grid-cols-4 gap-4'>

                    <div className='col-1 border-2 flex flex-col '>
                        <div>
                            <img src='https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&w=600' className='w-full h-auto object-cover' />
                        </div>
                        <div className='flex flex-col flex-grow p-3'>
                            <h1 className=''>Text</h1>
                            <p className='flex-grow'>The world is the totality of entities, the whole of reality, or everything that exists. The nature of the world has been conceptualized differently in different fields. Some conceptions see the world as unique, while others talk of a "plurality of worlds "</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div className='col-2 border-2 flex flex-col '>
                        <div>
                            <img src='https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&w=600' className='w-full h-auto object-cover' />
                        </div>
                        <div className='flex flex-col flex-grow p-3'>

                            <h1>Text</h1>
                            <p className='flex-grow'>The world is the totality of entities, ts"</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div className='col-3 border-2 flex flex-col '>
                        <div>
                            <img src='https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&w=600' className='w-full h-auto object-cover' />
                        </div>
                        <div className='flex flex-col flex-grow p-3'>

                            <h1>Text</h1>
                            <p className='flex-grow'>The world is the totality of entities, the whole of reality, or everything that exists. The nature of the world has been conceptualized differently "</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div className='col-4 border-2 flex flex-col '>
                        <div>
                            <img src='https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&w=600' className='w-full h-auto object-cover' />
                        </div>
                        <div className='flex flex-col flex-grow p-3'>

                            <h1>Text</h1>
                            <p className='flex-grow'>The world is the totality of entities, the whole of reality, or everything that exists. The nature"</p>
                            <button>Read more</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Test
