const CLIENT_ID = '773b558948a7c0b';

const uploadImage = (e) => {
    e.preventDefault();

    const file = document.getElementById('input-upload');

    const data = new FormData();
    data.append('image', file.files[0]);

    console.log(data);
};

const form = document.getElementById('form-cadastro');
form.addEventListener('submit', uploadImage);