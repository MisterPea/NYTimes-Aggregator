// const key = 'nDByaIg6JlesybbNCdNId8mQ7ScGOKCD' // This will be moved to the backend - will request new key at that time.

/**
 * Method to pull stories from NY Times TopStories API.
 * @param {string} section - String representation of the section to be pulled.
 * @return {Promise} Top Stories data.
*/
export function grabTopStories(section){
    return fetch(`http://localhost:8090/${section}`)
        .then(result => result.json())
        .then(data => {
            if(!data.results){
                throw new Error(data.message)
            }
            return data.results 
        }) 
        .catch((err) => console.error(err))
}


