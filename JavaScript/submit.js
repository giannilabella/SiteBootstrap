const CLIENT_ID = '773b558948a7c0b';
let imagesArray = [];

const addImage = (url) => {
    const gallery = document.getElementById('added-images');

    //gallery.innerHTML = `<a href="${url}">`;
};

const onSuccess = (result) => {
    const { data: { link } } = result;
    console.log(link)
    
    

    imagesArray.push(link);
    addImageNames(link);
    addImage(link);
};

const doImageUpload = (url, options) => {
    const promiseCallback = (resolve, reject) => {
        fetch(url, options)
            .then(response => response.json())
            .then(resolve)
            .catch(reject);
    };

    return new Promise(promiseCallback);
};

const uploadImage = (e) => {
    //e.preventDefault();

    const file = document.getElementById('input-upload');

    const requests = Object
        .keys(file.files)
        .map( (key, index) => {
            const data = new FormData();
            data.append('image', file.files[key]);

            doImageUpload('https://api.imgur.com/3/image', {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Client-ID ${CLIENT_ID}`,
                },
            })
            .then(onSuccess)
            .catch(console.error);
        } );

    // Promise.all(requests).then(() => {
    //     console.log("Images", imagesArray);
    //     postRecipe(imagesArray);
    // });
};

/*
const form = document.getElementById('form-cadastro');
form.addEventListener('submit', uploadImage);
*/