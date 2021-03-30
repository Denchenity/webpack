export default class Post {
    constructor (title, img){
        this.title = title
        this.date = new Date()
        this.img = img
    }
    ToString(){ 
        return JSON.stringify({ // возваращает строкой массивы и объекты (функция stringify)
            title: this.title,
            date: this.date,
            img: this.img
        },null,2)
    }
}