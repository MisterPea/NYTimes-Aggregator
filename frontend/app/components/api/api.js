const key = 'nDByaIg6JlesybbNCdNId8mQ7ScGOKCD' // This will be moved to the backend - will request new key at that time.

/* 
This function makes api calls to their TopStories API
@ arg {String} section - String representation of the section to be pulled. 
@ return {Promise} data.results - return is a promise of the resultant api return.
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


