export default class ImageUploaderService {
    constructor(axios) {
        this.axios = axios;
    }

    /**
     *
     * @param data "data:image/png;base64,JKSDJ..."
     * @returns {Promise<void>}
     */
    async uploadByBase64Data(data) {
        let formData = new FormData();
        const blob = this.convertToBlob(data);
        formData.append('file', blob);

        return this.axios.post('/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data, error => Promise.reject(error));
    }

    convertToBlob(data) {
        const blocks = data.split(";");
        const contentType = blocks[0].split(":")[1];
        const realData = blocks[1].split(',')[1];

        return this.b64toBlob(realData, contentType);
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        let byteCharacters = atob(b64Data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }


}