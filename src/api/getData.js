import axios from 'axios';

const endUrl = `https://pixabay.com/api/`;

const embedKey = (conditions) => ({
    key: process.env.REACT_APP_PIXABAY,
    ...conditions,
});

async function getData(conditions) {
    const urlEncodedCondition = {
        ...conditions,
        q: encodeURI(conditions.q),
    };
    const { data } = await axios.get(endUrl, {
        params: embedKey(urlEncodedCondition),
    });
    // TODO: 예외처리
    console.log(data);
    return data;
}

export default getData;
