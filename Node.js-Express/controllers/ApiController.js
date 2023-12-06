
export const getJoke = async (req, res) => {
    try {
        const url = "https://api.chucknorris.io/jokes/random";
        const fetchData = async () => {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        };
        const joke = await fetchData();
        res.json(joke);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get joke'
        });
    }
};

export const getQuote = async (req, res) => {
    try {
        const url = "https://api.quotable.io/quotes/random";
        const fetchData = async () => {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        };
        const joke = await fetchData();
        res.json(joke);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get quote'
        });
    }
};