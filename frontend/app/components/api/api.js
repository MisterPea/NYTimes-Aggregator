const key = 'nDByaIg6JlesybbNCdNId8mQ7ScGOKCD' // This will be moved to the backend - will request new key at that time.

/**
 * Method to pull stories from NY Times TopStories API.
 * @param {string} section - String representation of the section to be pulled.
 * @return {Promise} Top Stories data.
*/
export function grabTopStories(section){
    return fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${key}`)
        .then(result => result.json())
        .then(data => {
            if(!data.results){
                throw new Error(data.message)
            }
            return data.results 
        })  
}


