/*
    Database.js
    - handle data remotely

    Author @ Juan Lee (juanlee@kaist.ac.kr)
*/

// class Database
class Database{
    constructor(){
        this.endpoint = process.env.REACT_APP_JSON_ENDPOINT;
    }

    // getJSON: def -> Promise
    // - return <Promise> of json
    async getJSON(def){
        var data = await fetch(this.endpoint)
        .then(res => res.json())
        .then(json => json.result);

        // if data is null and default value is set up
        if(!data && def){
            return def;
        }
        return data;
    }

    // putJSON: json -> Promise
    // - return <Promise> after putting the json
    putJSON(json){
        return fetch(this.endpoint, {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify(json),
        });
    }

    // postJSON: json -> Promise
    // - return <Promise> after posting the json
    postJSON(json){
        return fetch(this.endpoint, {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(json),
        });
    }
}

export default new Database();