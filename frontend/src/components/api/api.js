/**
 * Method to pull stories from NY Times TopStories API.
 * @param {string} section - String representation of the section to be pulled.
 * @return {Promise} Top Stories data.
*/
export function grabTopStories(section){
    return fetch(`http://35.207.5.197/api/${section}`)
        .then(result => result.json())
        .then(data => {
            if(!data.results){
                throw new Error(data.message)
            }
            return data.results 
        }) 
        .catch((err) => console.error("Failed",err))

}


